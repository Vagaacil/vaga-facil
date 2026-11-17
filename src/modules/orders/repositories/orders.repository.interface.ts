import { Reservation } from '../entities/reservation.entity.js';
import { Motorista } from '../entities/motorista.entity.js';
import { Veiculo } from '../entities/veiculo.entity.js';
import { Reserva } from '../entities/reserva.entity.js';

export const ORDERS_REPOSITORY = 'ORDERS_REPOSITORY';

export interface IOrdersRepository {
  findById(reservationId: string): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<Reservation>;
  criarMotorista(motorista: Motorista): Promise<Motorista>;
  buscarMotorista(motoristaId: string): Promise<Motorista | null>;
  criarVeiculo(veiculo: Veiculo): Promise<Veiculo>;
  buscarVeiculo(veiculoId: string): Promise<Veiculo | null>;
  criarReserva(reserva: Reserva): Promise<Reserva>;
  buscarReserva(reservaId: string): Promise<Reserva | null>;
  salvarReserva(reserva: Reserva): Promise<Reserva>;
  buscarReservaAtivaDoVeiculo(veiculoId: string): Promise<Reserva | null>;
  listarReservasExpiradas(agora: Date): Promise<Reserva[]>;
}
