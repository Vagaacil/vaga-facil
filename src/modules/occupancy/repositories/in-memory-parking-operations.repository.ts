import { Injectable } from '@nestjs/common';
import { Patio } from '../entities/patio.entity.js';
import {
  DecisaoImpedimentoSaida,
  ImpedimentoSaida,
} from '../entities/impedimento-saida.entity.js';
import { CategoriaDeVaga } from '../entities/categoria-de-vaga.entity.js';
import { RegistroDePermanencia } from '../entities/registro-de-permanencia.entity.js';
import { TarifaVigente } from '../entities/tarifa-vigente.entity.js';
import { Vaga } from '../entities/vaga.entity.js';
import { VagaStatus } from '../entities/vaga-status.enum.js';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
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
export class InMemoryParkingOperationsRepository implements ParkingOperationsRepository {
  private readonly patios = new Map<string, Patio>();
  private readonly vagas = new Map<string, Vaga>();
  private readonly categorias = new Map<string, CategoriaDeVaga>();
  private readonly tarifas: TarifaVigente[] = [];
  private readonly permanencias = new Map<string, RegistroDePermanencia>();
  private readonly impedimentos = new Map<string, ImpedimentoSaida[]>();

  createPatio(patio: Patio): Promise<Patio> {
    if (this.patios.has(patio.patioId)) {
      throw new Error('PATIO_DUPLICADO');
    }
    this.patios.set(patio.patioId, patio);
    return Promise.resolve(patio);
  }

  listPatios(
    page: number,
    limit: number,
  ): Promise<{
    items: Patio[];
    page: number;
    limit: number;
    total: number;
  }> {
    const collator = new Intl.Collator('pt-BR');
    const items = [...this.patios.values()].sort((left, right) => {
      const nameComparison = collator.compare(left.nome, right.nome);
      return nameComparison !== 0
        ? nameComparison
        : collator.compare(left.patioId, right.patioId);
    });
    const total = items.length;
    const offset = (page - 1) * limit;
    return Promise.resolve({
      items: items.slice(offset, offset + limit),
      page,
      limit,
      total,
    });
  }

  buscarCategoria(
    patioId: string,
    codigo: string,
  ): Promise<CategoriaDeVaga | null> {
    return Promise.resolve(
      [...this.categorias.values()].find(
        (categoria) =>
          categoria.patioId === patioId && categoria.codigo === codigo,
      ) ?? null,
    );
  }

  findPatio(patioId: string): Promise<Patio | null> {
    return Promise.resolve(this.patios.get(patioId) ?? null);
  }

  async createVaga(vaga: Vaga): Promise<Vaga> {
    if (!(await this.findPatio(vaga.patioId))) {
      throw new PatioNaoEncontradoError(vaga.patioId);
    }
    if (
      [...this.vagas.values()].some(
        (existing) =>
          existing.patioId === vaga.patioId && existing.codigo === vaga.codigo,
      )
    ) {
      throw new Error('VAGA_DUPLICADA');
    }
    this.vagas.set(vaga.vagaId, vaga);
    return vaga;
  }

  async listVagas(patioId: string): Promise<Vaga[]> {
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    return [...this.vagas.values()]
      .filter((vaga) => vaga.patioId === patioId)
      .sort((a, b) => a.codigo.localeCompare(b.codigo));
  }

  async criarCategoria(categoria: CategoriaDeVaga): Promise<CategoriaDeVaga> {
    if (!(await this.findPatio(categoria.patioId))) {
      throw new PatioNaoEncontradoError(categoria.patioId);
    }
    if (
      [...this.categorias.values()].some(
        (existing) =>
          existing.patioId === categoria.patioId &&
          existing.codigo === categoria.codigo,
      )
    ) {
      throw new Error('CATEGORIA_DUPLICADA');
    }
    this.categorias.set(categoria.categoriaId, categoria);
    return categoria;
  }

  async listarCategorias(patioId: string): Promise<CategoriaDeVaga[]> {
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    return [...this.categorias.values()].filter(
      (categoria) => categoria.patioId === patioId,
    );
  }

  async associarCategoria(
    patioId: string,
    vagaId: string,
    categoria: string,
  ): Promise<Vaga> {
    const vaga = this.vagas.get(vagaId);
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    if (!vaga || vaga.patioId !== patioId) {
      throw new VagaNaoEncontradaError(vagaId);
    }
    const existeCategoria =
      categoria === 'PADRAO' ||
      [...this.categorias.values()].some(
        (item) => item.patioId === patioId && item.codigo === categoria,
      );
    if (!existeCategoria) {
      throw new CategoriaDeVagaNaoEncontradaError(categoria);
    }
    vaga.reclassificar(categoria);
    return vaga;
  }

  async reterVaga(
    patioId: string,
    categoria: string,
    reservaId: string,
    placa: string,
    expiraEm: Date,
    agora: Date,
  ): Promise<Vaga> {
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    for (const existente of this.vagas.values()) {
      if (existente.patioId === patioId && existente.retencaoExpirada(agora)) {
        existente.liberarRetencao();
      }
    }
    const vaga = [...this.vagas.values()]
      .filter(
        (item) =>
          item.patioId === patioId &&
          item.categoria === categoria &&
          item.getStatus() === VagaStatus.LIVRE,
      )
      .sort((a, b) => a.codigo.localeCompare(b.codigo))[0];
    if (!vaga) {
      throw new PatioLotadoError();
    }
    vaga.reter(reservaId, placa, expiraEm);
    return vaga;
  }

  liberarRetencao(vagaId: string, reservaId: string): Promise<void> {
    const vaga = this.vagas.get(vagaId);
    if (!vaga || vaga.getReservaId() !== reservaId) {
      throw new RetencaoNaoEncontradaError(reservaId);
    }
    vaga.liberarRetencao();
    return Promise.resolve();
  }

  expirarRetencoes(agora: Date): Promise<string[]> {
    const expiradas: string[] = [];
    for (const vaga of this.vagas.values()) {
      if (vaga.retencaoExpirada(agora)) {
        const reservaId = vaga.getReservaId();
        vaga.liberarRetencao();
        if (reservaId) {
          expiradas.push(reservaId);
        }
      }
    }
    return Promise.resolve(expiradas);
  }

  async obterIndicadores(patioId?: string) {
    if (patioId && !(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    const vagas = [...this.vagas.values()].filter(
      (vaga) => !patioId || vaga.patioId === patioId,
    );
    const permanencias = [...this.permanencias.values()].filter(
      (registro) => !patioId || registro.patioId === patioId,
    );
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
    this.tarifas.push(tarifa);
    return tarifa;
  }

  buscarTarifaVigente(
    patioId: string,
    instante: Date,
  ): Promise<TarifaVigente | null> {
    return Promise.resolve(
      this.tarifas
        .filter(
          (tarifa) =>
            tarifa.patioId === patioId && tarifa.vigenteDesde <= instante,
        )
        .sort(
          (a, b) => b.vigenteDesde.getTime() - a.vigenteDesde.getTime(),
        )[0] ?? null,
    );
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
    if (!(await this.findPatio(patioId))) {
      throw new PatioNaoEncontradoError(patioId);
    }
    if (
      [...this.permanencias.values()].some(
        (permanencia) =>
          permanencia.placa === placa &&
          permanencia.getStatus() === ParkingStayStatusEnum.OPEN,
      )
    ) {
      throw new VeiculoJaNoPatioError();
    }
    const vagasDoPatio = [...this.vagas.values()].filter(
      (candidata) => candidata.patioId === patioId,
    );
    const reservasExpiradas: string[] = [];
    for (const candidata of vagasDoPatio) {
      if (candidata.retencaoExpirada(horarioEntrada)) {
        const reservaExpirada = candidata.getReservaId();
        candidata.liberarRetencao();
        if (reservaExpirada) {
          reservasExpiradas.push(reservaExpirada);
        }
      }
    }
    const vagaReservada = vagasDoPatio.find(
      (candidata) =>
        candidata.getStatus() === VagaStatus.RESERVADA &&
        candidata.getReservaPlaca() === placa,
    );
    const vaga =
      vagaReservada ??
      vagasDoPatio
        .filter((candidata) => candidata.getStatus() === VagaStatus.LIVRE)
        .sort((a, b) => a.codigo.localeCompare(b.codigo))[0];
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
    this.permanencias.set(registro.registroId, registro);
    return { registro, vaga, reservaId, reservasExpiradas };
  }

  findPermanenciaById(
    registroId: string,
  ): Promise<RegistroDePermanencia | null> {
    return Promise.resolve(this.permanencias.get(registroId) ?? null);
  }

  finalizarSaida(
    registroId: string,
    horarioSaida: Date,
  ): Promise<{ registro: RegistroDePermanencia; vaga: Vaga }> {
    const registro = this.permanencias.get(registroId);
    if (!registro) {
      throw new PermanenciaNaoEncontradaError(registroId);
    }
    if (registro.getStatus() !== ParkingStayStatusEnum.OPEN) {
      throw new PermanenciaJaFechadaError();
    }
    const vaga = this.vagas.get(registro.vagaId);
    if (!vaga) {
      throw new VagaDaPermanenciaNaoEncontradaError(registro.vagaId);
    }
    registro.fechar(horarioSaida);
    vaga.liberar();
    return Promise.resolve({ registro, vaga });
  }

  resolverImpedimentoSaida(impedimento: ImpedimentoSaida): Promise<{
    impedimento: ImpedimentoSaida;
    registro: RegistroDePermanencia;
    vaga: Vaga;
  }> {
    const registro = this.permanencias.get(impedimento.registroId);
    if (!registro) {
      throw new PermanenciaNaoEncontradaError(impedimento.registroId);
    }
    if (registro.getStatus() !== ParkingStayStatusEnum.OPEN) {
      throw new PermanenciaJaFechadaError();
    }
    const vaga = this.vagas.get(registro.vagaId);
    if (!vaga) {
      throw new VagaDaPermanenciaNaoEncontradaError(registro.vagaId);
    }
    if (impedimento.decisao === DecisaoImpedimentoSaida.LIBERAR_MANUALMENTE) {
      registro.fechar(impedimento.resolvidoEm);
      vaga.liberar();
    }
    const history = this.impedimentos.get(impedimento.registroId) ?? [];
    history.push(impedimento);
    this.impedimentos.set(impedimento.registroId, history);
    return Promise.resolve({ impedimento, registro, vaga });
  }

  buscarPermanenciaAbertaPorPlaca(
    patioId: string,
    placa: string,
  ): Promise<RegistroDePermanencia | null> {
    return Promise.resolve(
      [...this.permanencias.values()].find(
        (permanencia) =>
          permanencia.patioId === patioId &&
          permanencia.placa === placa &&
          permanencia.getStatus() === ParkingStayStatusEnum.OPEN,
      ) ?? null,
    );
  }
}
