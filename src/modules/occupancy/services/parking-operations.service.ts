import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';
import { ParkingStayStatusEnum } from '../../../common/enums/parking-stay-status.enum.js';
import {
  DecisaoImpedimentoSaida,
  ImpedimentoSaida,
} from '../entities/impedimento-saida.entity.js';
import { Patio } from '../entities/patio.entity.js';
import { CategoriaDeVaga } from '../entities/categoria-de-vaga.entity.js';
import { TarifaVigente } from '../entities/tarifa-vigente.entity.js';
import { Vaga } from '../entities/vaga.entity.js';
import {
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
  PatioNaoEncontradoError,
} from '../domain/parking-operations.errors.js';
import {
  PARKING_OPERATIONS_REPOSITORY,
  type ParkingOperationsRepository,
} from '../domain/parking-operations.repository.interface.js';
import { CLOCK_PORT, type ClockPort } from '../domain/clock.port.js';
import { RegistrarEntradaHandler } from './registrar-entrada.handler.js';
import { PaymentsService } from '../../payments/services/payments.service.js';
import { ConcluirSaidaResponseDto } from '../dto/concluir-saida-response.dto.js';
import {
  RESERVATION_ENTRY_PORT,
  type ReservationEntryPort,
} from '../domain/reservation-entry.port.js';

@Injectable()
export class ParkingOperationsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ParkingOperationsService.name);
  private expirationInterval?: NodeJS.Timeout;

  constructor(
    @Inject(PARKING_OPERATIONS_REPOSITORY)
    private readonly repository: ParkingOperationsRepository,
    @Inject(CLOCK_PORT) private readonly clock: ClockPort,
    private readonly registrarEntradaHandler: RegistrarEntradaHandler,
    private readonly paymentsService: PaymentsService,
    @Optional()
    @Inject(RESERVATION_ENTRY_PORT)
    private readonly reservationEntryPort?: ReservationEntryPort,
  ) {}

  onModuleInit(): void {
    this.expirationInterval = setInterval(() => {
      void this.expirarRetencoes().catch((error: unknown) => {
        this.logger.error(
          'Falha ao expirar retenções de Vaga.',
          error instanceof Error ? error.stack : String(error),
        );
      });
    }, 30_000);
    this.expirationInterval.unref();
  }

  onModuleDestroy(): void {
    if (this.expirationInterval) {
      clearInterval(this.expirationInterval);
    }
  }

  async criarPatio(name: unknown): Promise<Patio> {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestException('O nome do pátio é obrigatório.');
    }
    try {
      return await this.repository.createPatio(
        new Patio(randomUUID(), name.trim()),
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'PATIO_DUPLICADO') {
        throw new ConflictException({
          code: 'PATIO_DUPLICADO',
          message: 'Já existe um Pátio com este identificador.',
        });
      }
      throw error;
    }
  }

  async criarVaga(
    patioId: string,
    codigo: unknown,
    categoria: unknown = 'PADRAO',
  ): Promise<Vaga> {
    if (typeof codigo !== 'string' || codigo.trim().length === 0) {
      throw new BadRequestException('O código da vaga é obrigatório.');
    }
    if (typeof categoria !== 'string' || categoria.trim().length === 0) {
      throw new BadRequestException('A categoria da vaga é inválida.');
    }
    try {
      return await this.repository.createVaga(
        new Vaga(randomUUID(), patioId, codigo.trim(), categoria.trim()),
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'VAGA_DUPLICADA') {
        throw new ConflictException({
          code: 'VAGA_DUPLICADA',
          message: 'Já existe uma Vaga com este código no Pátio.',
        });
      }
      throw error;
    }
  }

  async listarVagas(patioId: string): Promise<Vaga[]> {
    return this.repository.listVagas(patioId);
  }

  async criarCategoria(
    patioId: string,
    codigo: unknown,
    descricao: unknown,
    tiposVeiculoCompativeis: unknown = [],
  ): Promise<CategoriaDeVaga> {
    if (typeof codigo !== 'string' || !codigo.trim()) {
      throw new BadRequestException('O código da categoria é obrigatório.');
    }
    if (typeof descricao !== 'string' || !descricao.trim()) {
      throw new BadRequestException('A descrição da categoria é obrigatória.');
    }
    if (
      !Array.isArray(tiposVeiculoCompativeis) ||
      tiposVeiculoCompativeis.some((tipo) => typeof tipo !== 'string')
    ) {
      throw new BadRequestException(
        'tiposVeiculoCompativeis deve conter somente textos.',
      );
    }
    try {
      return await this.repository.criarCategoria(
        new CategoriaDeVaga(
          randomUUID(),
          patioId,
          codigo.trim().toUpperCase(),
          descricao.trim(),
          tiposVeiculoCompativeis.map((tipo: string) =>
            tipo.trim().toUpperCase(),
          ),
        ),
      );
    } catch (error) {
      if (error instanceof Error && error.message === 'CATEGORIA_DUPLICADA') {
        throw new ConflictException({
          code: 'CATEGORIA_DUPLICADA',
          message: 'Já existe uma Categoria com este código no Pátio.',
        });
      }
      throw error;
    }
  }

  async listarCategorias(patioId: string): Promise<CategoriaDeVaga[]> {
    return this.repository.listarCategorias(patioId);
  }

  async associarCategoria(
    patioId: string,
    vagaId: string,
    categoria: unknown,
  ): Promise<Vaga> {
    if (typeof categoria !== 'string' || !categoria.trim()) {
      throw new BadRequestException('A categoria é obrigatória.');
    }
    return this.repository.associarCategoria(
      patioId,
      vagaId,
      categoria.trim().toUpperCase(),
    );
  }

  async verificarCompatibilidadeVeiculo(
    patioId: string,
    categoria: string,
    tipoVeiculo: string,
  ): Promise<void> {
    const configuracao = await this.repository.buscarCategoria(
      patioId,
      categoria,
    );
    if (!configuracao) {
      if (categoria === 'PADRAO') {
        return;
      }
      throw new NotFoundException({
        code: 'CATEGORIA_NAO_ENCONTRADA',
        message: 'A categoria informada não está configurada neste Pátio.',
      });
    }
    const permitidos = configuracao.tiposVeiculoCompativeis;
    if (permitidos.length > 0 && !permitidos.includes(tipoVeiculo)) {
      throw new ConflictException({
        code: 'VEICULO_INCOMPATIVEL_COM_CATEGORIA',
        message: 'O veículo não é compatível com a categoria da Vaga.',
      });
    }
  }

  async reterVaga(
    patioId: string,
    categoria: string,
    reservaId: string,
    placa: string,
    expiraEm: Date,
  ): Promise<Vaga> {
    return this.repository.reterVaga(
      patioId,
      categoria,
      reservaId,
      placa,
      expiraEm,
      this.clock.agora(),
    );
  }

  async liberarRetencao(vagaId: string, reservaId: string): Promise<void> {
    return this.repository.liberarRetencao(vagaId, reservaId);
  }

  async expirarRetencoes(): Promise<void> {
    const agora = this.clock.agora();
    const expiradas = await this.repository.expirarRetencoes(agora);
    for (const reservaId of expiradas) {
      await this.reservationEntryPort?.expirarReserva(reservaId, agora);
    }
  }

  async indicadores(patioId?: string) {
    return this.repository.obterIndicadores(patioId);
  }

  async definirTarifa(
    patioId: string,
    valorPorHora: unknown,
    fracaoMinutos: unknown = 60,
    toleranciaMinutos: unknown = 0,
    vigenteDesde?: unknown,
  ): Promise<TarifaVigente> {
    if (
      typeof valorPorHora !== 'number' ||
      !Number.isFinite(valorPorHora) ||
      valorPorHora <= 0
    ) {
      throw new BadRequestException(
        'valorPorHora deve ser um número positivo.',
      );
    }
    if (
      !Number.isInteger(fracaoMinutos) ||
      Number(fracaoMinutos) < 1 ||
      Number(fracaoMinutos) > 60
    ) {
      throw new BadRequestException(
        'fracaoMinutos deve ser um inteiro entre 1 e 60.',
      );
    }
    if (!Number.isInteger(toleranciaMinutos) || Number(toleranciaMinutos) < 0) {
      throw new BadRequestException(
        'toleranciaMinutos deve ser um inteiro não negativo.',
      );
    }
    const effectiveDate =
      vigenteDesde === undefined
        ? this.clock.agora()
        : vigenteDesde instanceof Date
          ? vigenteDesde
          : typeof vigenteDesde === 'string'
            ? new Date(vigenteDesde)
            : new Date(Number.NaN);
    if (Number.isNaN(effectiveDate.getTime())) {
      throw new BadRequestException('vigenteDesde deve ser uma data válida.');
    }
    return this.repository.salvarTarifa(
      new TarifaVigente(
        randomUUID(),
        patioId,
        valorPorHora,
        Number(fracaoMinutos),
        Number(toleranciaMinutos),
        effectiveDate,
      ),
    );
  }

  async tarifaVigente(patioId: string): Promise<TarifaVigente> {
    const patio = await this.repository.findPatio(patioId);
    if (!patio) {
      throw new PatioNaoEncontradoError(patioId);
    }
    const tarifa = await this.repository.buscarTarifaVigente(
      patioId,
      this.clock.agora(),
    );
    if (!tarifa) {
      throw new ConflictException({
        code: 'TARIFA_NAO_DEFINIDA',
        message: 'Não há tarifa vigente para este pátio.',
      });
    }
    return tarifa;
  }

  async registrarEntrada(command: { patioId: string; placa: string }) {
    const resultado = await this.registrarEntradaHandler.executar(command);
    for (const reservaId of resultado.reservasExpiradas ?? []) {
      await this.reservationEntryPort?.expirarReserva(
        reservaId,
        resultado.registro.horarioEntrada,
      );
    }
    if (resultado.reservaId && this.reservationEntryPort) {
      await this.reservationEntryPort.confirmarEntrada(resultado.reservaId);
    }
    return resultado;
  }

  async concluirSaida(
    registroId: string,
    horarioSaida = this.clock.agora(),
  ): Promise<ConcluirSaidaResponseDto> {
    const registro = await this.repository.findPermanenciaById(registroId);
    if (!registro) {
      throw new PermanenciaNaoEncontradaError(registroId);
    }
    if (registro.getStatus() !== ParkingStayStatusEnum.OPEN) {
      throw new PermanenciaJaFechadaError();
    }
    if (horarioSaida < registro.horarioEntrada) {
      throw new BadRequestException({
        code: 'HORARIO_SAIDA_INVALIDO',
        message: 'A saída não pode ocorrer antes da entrada.',
      });
    }

    const tarifa = await this.repository.buscarTarifaVigente(
      registro.patioId,
      horarioSaida,
    );
    if (!tarifa) {
      throw new ConflictException({
        code: 'TARIFA_NAO_DEFINIDA',
        message: 'Não há Tarifa Vigente para este Pátio.',
      });
    }
    const minutos = Math.ceil(
      (horarioSaida.getTime() - registro.horarioEntrada.getTime()) / 60_000,
    );
    const minutosFaturados = Math.max(0, minutos - tarifa.toleranciaMinutos);
    const fracoes = Math.ceil(minutosFaturados / tarifa.fracaoMinutos);
    const valor = Number(
      (fracoes * tarifa.valorPorHora * (tarifa.fracaoMinutos / 60)).toFixed(2),
    );
    const pagamento = await this.paymentsService.processar(registroId, valor);
    if (pagamento.status !== PaymentStatusEnum.APPROVED) {
      throw new ConflictException({
        code: 'PAGAMENTO_RECUSADO',
        message: 'O pagamento foi recusado; a permanência continua aberta.',
      });
    }

    try {
      await this.repository.finalizarSaida(registroId, horarioSaida);
    } catch (error) {
      if (error instanceof PermanenciaJaFechadaError) {
        throw new ConflictException({
          code: 'PERMANENCIA_JA_FECHADA',
          message: error.message,
        });
      }
      if (error instanceof PermanenciaNaoEncontradaError) {
        throw new NotFoundException({
          code: 'PERMANENCIA_NAO_ENCONTRADA',
          message: error.message,
        });
      }
      throw error;
    }

    return new ConcluirSaidaResponseDto(
      registro.registroId,
      registro.placa,
      registro.vagaId,
      horarioSaida,
      valor,
      pagamento.transacaoId,
      pagamento.status,
    );
  }

  async resolverImpedimentoSaida(
    registroId: string,
    decisao: unknown,
    justificativa: unknown,
    operadorId: unknown,
  ) {
    if (
      decisao !== DecisaoImpedimentoSaida.LIBERAR_MANUALMENTE &&
      decisao !== DecisaoImpedimentoSaida.MANTER_RETIDO
    ) {
      throw new BadRequestException({
        code: 'DECISAO_INVALIDA',
        message: 'A decisão de resolução do impedimento é inválida.',
      });
    }
    if (typeof justificativa !== 'string' || !justificativa.trim()) {
      throw new BadRequestException({
        code: 'JUSTIFICATIVA_OBRIGATORIA',
        message: 'A justificativa do operador é obrigatória.',
      });
    }
    if (typeof operadorId !== 'string' || !operadorId.trim()) {
      throw new BadRequestException({
        code: 'OPERADOR_OBRIGATORIO',
        message: 'O identificador do operador é obrigatório.',
      });
    }

    const impedimento = new ImpedimentoSaida(
      randomUUID(),
      registroId,
      decisao,
      justificativa.trim(),
      operadorId.trim(),
      this.clock.agora(),
    );
    try {
      const resultado =
        await this.repository.resolverImpedimentoSaida(impedimento);
      return {
        impedimentoId: resultado.impedimento.impedimentoId,
        registroId,
        decisao: resultado.impedimento.decisao,
        justificativa: resultado.impedimento.justificativa,
        operadorId: resultado.impedimento.operadorId,
        resolvidoEm: resultado.impedimento.resolvidoEm,
        statusPermanencia: resultado.registro.getStatus(),
        statusVaga: resultado.vaga.getStatus(),
      };
    } catch (error) {
      if (error instanceof PermanenciaNaoEncontradaError) {
        throw new NotFoundException({
          code: 'PERMANENCIA_NAO_ENCONTRADA',
          message: error.message,
        });
      }
      if (error instanceof PermanenciaJaFechadaError) {
        throw new ConflictException({
          code: 'PERMANENCIA_JA_FECHADA',
          message: error.message,
        });
      }
      throw error;
    }
  }
}
