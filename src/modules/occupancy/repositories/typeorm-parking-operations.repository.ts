import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Patio } from '../entities/patio.entity.js';
import {
  DecisaoImpedimentoSaida,
  ImpedimentoSaida,
} from '../entities/impedimento-saida.entity.js';
import { CategoriaDeVaga } from '../entities/categoria-de-vaga.entity.js';
import { RegistroDePermanencia } from '../entities/registro-de-permanencia.entity.js';
import { TarifaVigente } from '../entities/tarifa-vigente.entity.js';
import { Vaga } from '../entities/vaga.entity.js';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import { VagaStatus } from '../entities/vaga-status.enum.js';
import {
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
  CategoriaDeVagaNaoEncontradaError,
  PatioLotadoError,
  PatioNaoEncontradoError,
  RetencaoNaoEncontradaError,
  VeiculoJaNoPatioError,
  VagaDaPermanenciaNaoEncontradaError,
  VagaNaoEncontradaError,
} from '../domain/parking-operations.errors.js';
import { ParkingOperationsRepository } from '../domain/parking-operations.repository.interface.js';

@Injectable()
export class TypeOrmParkingOperationsRepository implements ParkingOperationsRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createPatio(patio: Patio): Promise<Patio> {
    return this.dataSource.getRepository(Patio).save(patio);
  }

  async listPatios(page: number, limit: number) {
    const repository = this.dataSource.getRepository(Patio);
    const [items, total] = await repository.findAndCount({
      order: { nome: 'ASC', patioId: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, page, limit, total };
  }

  buscarCategoria(
    patioId: string,
    codigo: string,
  ): Promise<CategoriaDeVaga | null> {
    return this.dataSource
      .getRepository(CategoriaDeVaga)
      .findOne({ where: { patioId, codigo } });
  }

  async findPatio(patioId: string): Promise<Patio | null> {
    return this.dataSource.getRepository(Patio).findOne({ where: { patioId } });
  }

  async createVaga(vaga: Vaga): Promise<Vaga> {
    if (!(await this.findPatio(vaga.patioId))) {
      throw new PatioNaoEncontradoError(vaga.patioId);
    }
    return this.dataSource.getRepository(Vaga).save(vaga);
  }

  async listVagas(patioId: string): Promise<Vaga[]> {
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    return this.dataSource.getRepository(Vaga).find({
      where: { patioId },
      order: { codigo: 'ASC' },
    });
  }

  async criarCategoria(categoria: CategoriaDeVaga): Promise<CategoriaDeVaga> {
    if (!(await this.findPatio(categoria.patioId))) {
      throw new PatioNaoEncontradoError(categoria.patioId);
    }
    return this.dataSource.getRepository(CategoriaDeVaga).save(categoria);
  }

  async listarCategorias(patioId: string): Promise<CategoriaDeVaga[]> {
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    return this.dataSource
      .getRepository(CategoriaDeVaga)
      .find({ where: { patioId }, order: { codigo: 'ASC' } });
  }

  async associarCategoria(
    patioId: string,
    vagaId: string,
    categoria: string,
  ): Promise<Vaga> {
    const vaga = await this.dataSource.getRepository(Vaga).findOne({
      where: { vagaId, patioId },
    });
    if (!vaga) {
      if (!(await this.findPatio(patioId))) {
        throw new PatioNaoEncontradoError(patioId);
      }
      throw new VagaNaoEncontradaError(vagaId);
    }
    if (
      categoria !== 'PADRAO' &&
      !(await this.dataSource.getRepository(CategoriaDeVaga).findOne({
        where: { patioId, codigo: categoria },
      }))
    ) {
      throw new CategoriaDeVagaNaoEncontradaError(categoria);
    }
    vaga.reclassificar(categoria);
    return this.dataSource.getRepository(Vaga).save(vaga);
  }

  async reterVaga(
    patioId: string,
    categoria: string,
    reservaId: string,
    placa: string,
    expiraEm: Date,
    agora: Date,
  ): Promise<Vaga> {
    return this.dataSource.transaction(async (manager) => {
      const patio = await manager.findOne(Patio, {
        where: { patioId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!patio) {
        throw new PatioNaoEncontradoError(patioId);
      }
      const vagas = await manager.find(Vaga, {
        where: { patioId },
        order: { codigo: 'ASC' },
        lock: { mode: 'pessimistic_write' },
      });
      for (const vaga of vagas) {
        if (vaga.retencaoExpirada(agora)) {
          vaga.liberarRetencao();
          await manager.save(vaga);
        }
      }
      const vaga = vagas.find(
        (item) =>
          item.categoria === categoria && item.getStatus() === VagaStatus.LIVRE,
      );
      if (!vaga) {
        throw new PatioLotadoError();
      }
      vaga.reter(reservaId, placa, expiraEm);
      return manager.save(vaga);
    });
  }

  async liberarRetencao(vagaId: string, reservaId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const vaga = await manager.findOne(Vaga, {
        where: { vagaId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!vaga || vaga.getReservaId() !== reservaId) {
        throw new RetencaoNaoEncontradaError(reservaId);
      }
      vaga.liberarRetencao();
      await manager.save(vaga);
    });
  }

  async expirarRetencoes(agora: Date): Promise<string[]> {
    return this.dataSource.transaction(async (manager) => {
      const vagas = await manager
        .createQueryBuilder(Vaga, 'vaga')
        .setLock('pessimistic_write')
        .where('vaga.status = :status', { status: VagaStatus.RESERVADA })
        .andWhere('vaga.reservaExpiraEm <= :agora', { agora })
        .getMany();
      const reservasExpiradas: string[] = [];
      for (const vaga of vagas) {
        const reservaId = vaga.getReservaId();
        vaga.liberarRetencao();
        await manager.save(vaga);
        if (reservaId) {
          reservasExpiradas.push(reservaId);
        }
      }
      return reservasExpiradas;
    });
  }

  async obterIndicadores(patioId?: string) {
    if (patioId && !(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    const vagas = await this.dataSource
      .getRepository(Vaga)
      .find(patioId ? { where: { patioId } } : {});
    const permanencias = await this.dataSource
      .getRepository(RegistroDePermanencia)
      .find(patioId ? { where: { patioId } } : {});
    const fechadas = permanencias.filter(
      (registro) => registro.horarioSaida != null,
    );
    const totalMinutos = fechadas.reduce(
      (total, registro) =>
        total +
        (registro.horarioSaida!.getTime() - registro.horarioEntrada.getTime()) /
          60_000,
      0,
    );
    const vagasLivres = vagas.filter(
      (vaga) => vaga.getStatus() === VagaStatus.LIVRE,
    ).length;
    const vagasOcupadas = vagas.filter(
      (vaga) => vaga.getStatus() === VagaStatus.OCUPADA,
    ).length;
    const vagasReservadas = vagas.filter(
      (vaga) => vaga.getStatus() === VagaStatus.RESERVADA,
    ).length;
    const totalVagas = vagas.length;
    return {
      totalVagas,
      vagasLivres,
      vagasOcupadas,
      vagasReservadas,
      taxaOcupacao:
        totalVagas === 0
          ? 0
          : Number(((vagasOcupadas / totalVagas) * 100).toFixed(2)),
      tempoMedioPermanenciaMinutos:
        fechadas.length === 0
          ? 0
          : Number((totalMinutos / fechadas.length).toFixed(2)),
    };
  }

  async salvarTarifa(tarifa: TarifaVigente): Promise<TarifaVigente> {
    if (!(await this.findPatio(tarifa.patioId))) {
      throw new PatioNaoEncontradoError(tarifa.patioId);
    }
    return this.dataSource.getRepository(TarifaVigente).save(tarifa);
  }

  async buscarTarifaVigente(
    patioId: string,
    instante: Date,
  ): Promise<TarifaVigente | null> {
    return this.dataSource
      .getRepository(TarifaVigente)
      .createQueryBuilder('tarifa')
      .where('tarifa.patioId = :patioId', { patioId })
      .andWhere('tarifa.vigenteDesde <= :instante', { instante })
      .orderBy('tarifa.vigenteDesde', 'DESC')
      .getOne();
  }

  async registrarEntrada(
    patioId: string,
    placa: string,
    horarioEntrada: Date,
    registroId: string,
  ): Promise<{
    registro: RegistroDePermanencia;
    vaga: Vaga;
    reservaId?: string;
    reservasExpiradas: string[];
  }> {
    return this.dataSource.transaction(async (manager) => {
      const patio = await manager.findOne(Patio, {
        where: { patioId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!patio) {
        throw new PatioNaoEncontradoError(patioId);
      }

      const permanenciaAberta = await manager
        .createQueryBuilder(RegistroDePermanencia, 'permanencia')
        .where('permanencia.placa = :placa', { placa })
        .andWhere('permanencia.status = :status', {
          status: ParkingStayStatusEnum.OPEN,
        })
        .getOne();
      if (permanenciaAberta) {
        throw new VeiculoJaNoPatioError();
      }

      const vagas = await manager.find(Vaga, {
        where: { patioId },
        order: { codigo: 'ASC' },
        lock: { mode: 'pessimistic_write' },
      });
      const reservasExpiradas: string[] = [];
      for (const candidata of vagas) {
        if (candidata.retencaoExpirada(horarioEntrada)) {
          const reservaExpirada = candidata.getReservaId();
          candidata.liberarRetencao();
          await manager.save(candidata);
          if (reservaExpirada) {
            reservasExpiradas.push(reservaExpirada);
          }
        }
      }
      const vagaReservada = vagas.find(
        (candidata) =>
          candidata.getStatus() === VagaStatus.RESERVADA &&
          candidata.getReservaPlaca() === placa,
      );
      const vaga =
        vagaReservada ??
        vagas.find((candidata) => candidata.getStatus() === VagaStatus.LIVRE);
      if (!vaga) {
        throw new PatioLotadoError();
      }

      const reservaId = vaga.getReservaId();
      vaga.ocupar(reservaId, placa);
      const registro = RegistroDePermanencia.abrir(
        placa,
        vaga.vagaId,
        horarioEntrada,
        patioId,
        registroId,
      );
      await manager.save(vaga);
      await manager.save(registro);
      return { registro, vaga, reservaId, reservasExpiradas };
    });
  }

  findPermanenciaById(
    registroId: string,
  ): Promise<RegistroDePermanencia | null> {
    return this.dataSource
      .getRepository(RegistroDePermanencia)
      .findOne({ where: { registroId } });
  }

  async finalizarSaida(
    registroId: string,
    horarioSaida: Date,
  ): Promise<{ registro: RegistroDePermanencia; vaga: Vaga }> {
    return this.dataSource.transaction(async (manager) => {
      const registro = await manager
        .createQueryBuilder(RegistroDePermanencia, 'permanencia')
        .setLock('pessimistic_write')
        .where('permanencia.registroId = :registroId', { registroId })
        .getOne();
      if (!registro) {
        throw new PermanenciaNaoEncontradaError(registroId);
      }
      if (registro.getStatus() !== ParkingStayStatusEnum.OPEN) {
        throw new PermanenciaJaFechadaError();
      }
      const vaga = await manager.findOne(Vaga, {
        where: { vagaId: registro.vagaId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!vaga) {
        throw new VagaDaPermanenciaNaoEncontradaError(registro.vagaId);
      }

      registro.fechar(horarioSaida);
      vaga.liberar();
      await manager.save(registro);
      await manager.save(vaga);
      return { registro, vaga };
    });
  }

  async resolverImpedimentoSaida(impedimento: ImpedimentoSaida): Promise<{
    impedimento: ImpedimentoSaida;
    registro: RegistroDePermanencia;
    vaga: Vaga;
  }> {
    return this.dataSource.transaction(async (manager) => {
      const registro = await manager
        .createQueryBuilder(RegistroDePermanencia, 'permanencia')
        .setLock('pessimistic_write')
        .where('permanencia.registroId = :registroId', {
          registroId: impedimento.registroId,
        })
        .getOne();
      if (!registro) {
        throw new PermanenciaNaoEncontradaError(impedimento.registroId);
      }
      if (registro.getStatus() !== ParkingStayStatusEnum.OPEN) {
        throw new PermanenciaJaFechadaError();
      }
      const vaga = await manager.findOne(Vaga, {
        where: { vagaId: registro.vagaId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!vaga) {
        throw new VagaDaPermanenciaNaoEncontradaError(registro.vagaId);
      }
      if (impedimento.decisao === DecisaoImpedimentoSaida.LIBERAR_MANUALMENTE) {
        registro.fechar(impedimento.resolvidoEm);
        vaga.liberar();
        await manager.save(registro);
        await manager.save(vaga);
      }
      await manager.save(impedimento);
      return { impedimento, registro, vaga };
    });
  }

  async buscarPermanenciaAbertaPorPlaca(
    patioId: string,
    placa: string,
  ): Promise<RegistroDePermanencia | null> {
    return this.dataSource
      .getRepository(RegistroDePermanencia)
      .createQueryBuilder('permanencia')
      .where('permanencia.patioId = :patioId', { patioId })
      .andWhere('permanencia.placa = :placa', { placa })
      .andWhere('permanencia.status = :status', {
        status: ParkingStayStatusEnum.OPEN,
      })
      .getOne();
  }
}
