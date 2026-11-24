import { Patio } from '../entities/patio.entity.js';
import { ImpedimentoSaida } from '../entities/impedimento-saida.entity.js';
import { CategoriaDeVaga } from '../entities/categoria-de-vaga.entity.js';
import { RegistroDePermanencia } from '../entities/registro-de-permanencia.entity.js';
import { TarifaVigente } from '../entities/tarifa-vigente.entity.js';
import { Vaga } from '../entities/vaga.entity.js';

export const PARKING_OPERATIONS_REPOSITORY = 'PARKING_OPERATIONS_REPOSITORY';

export interface PaginatedPatios {
  items: Patio[];
  page: number;
  limit: number;
  total: number;
}

export interface ParkingOperationsRepository {
  createPatio(patio: Patio): Promise<Patio>;
  listPatios(page: number, limit: number): Promise<PaginatedPatios>;
  findPatio(patioId: string): Promise<Patio | null>;
  findVaga(patioId: string, vagaId: string): Promise<Vaga | null>;
  createVaga(vaga: Vaga): Promise<Vaga>;
  listVagas(patioId: string): Promise<Vaga[]>;
  findCategoria(
    patioId: string,
    categoriaId: string,
  ): Promise<CategoriaDeVaga | null>;
  criarCategoria(categoria: CategoriaDeVaga): Promise<CategoriaDeVaga>;
  listarCategorias(patioId: string): Promise<CategoriaDeVaga[]>;
  associarCategoria(
    patioId: string,
    vagaId: string,
    categoria: string,
  ): Promise<Vaga>;
  reterVaga(
    patioId: string,
    categoria: string,
    reservaId: string,
    placa: string,
    expiraEm: Date,
    agora: Date,
  ): Promise<Vaga>;
  liberarRetencao(vagaId: string, reservaId: string): Promise<void>;
  expirarRetencoes(agora: Date): Promise<string[]>;
  buscarCategoria(
    patioId: string,
    codigo: string,
  ): Promise<CategoriaDeVaga | null>;
  obterIndicadores(patioId?: string): Promise<{
    totalVagas: number;
    vagasLivres: number;
    vagasOcupadas: number;
    vagasReservadas: number;
    taxaOcupacao: number;
    tempoMedioPermanenciaMinutos: number;
  }>;
  salvarTarifa(tarifa: TarifaVigente): Promise<TarifaVigente>;
  findTarifa(patioId: string, tarifaId: string): Promise<TarifaVigente | null>;
  buscarTarifaVigente(
    patioId: string,
    instante: Date,
  ): Promise<TarifaVigente | null>;
  registrarEntrada(
    patioId: string,
    placa: string,
    horarioEntrada: Date,
    registroId: string,
  ): Promise<{
    registro: RegistroDePermanencia;
    vaga: Vaga;
    reservaId?: string;
    reservasExpiradas?: string[];
  }>;
  findPermanenciaById(
    registroId: string,
  ): Promise<RegistroDePermanencia | null>;
  finalizarSaida(
    registroId: string,
    horarioSaida: Date,
  ): Promise<{ registro: RegistroDePermanencia; vaga: Vaga }>;
  resolverImpedimentoSaida(impedimento: ImpedimentoSaida): Promise<{
    impedimento: ImpedimentoSaida;
    registro: RegistroDePermanencia;
    vaga: Vaga;
  }>;
  buscarPermanenciaAbertaPorPlaca(
    patioId: string,
    placa: string,
  ): Promise<RegistroDePermanencia | null>;
  listarImpedimentos(registroId: string): Promise<ImpedimentoSaida[]>;
}
