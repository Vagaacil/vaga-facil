import { Patio } from '../entities/patio.entity.js';
import { ImpedimentoSaida } from '../entities/impedimento-saida.entity.js';
import { CategoriaDeVaga } from '../entities/categoria-de-vaga.entity.js';
import { RegistroDePermanencia } from '../entities/registro-de-permanencia.entity.js';
import { TarifaVigente } from '../entities/tarifa-vigente.entity.js';
import { Vaga } from '../entities/vaga.entity.js';

export const PARKING_OPERATIONS_REPOSITORY = 'PARKING_OPERATIONS_REPOSITORY';

export interface ParkingOperationsRepository {
  createPatio(patio: Patio): Promise<Patio>;
  findPatio(patioId: string): Promise<Patio | null>;
  createVaga(vaga: Vaga): Promise<Vaga>;
  listVagas(patioId: string): Promise<Vaga[]>;
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
}
