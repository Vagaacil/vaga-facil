export const RESERVATION_ENTRY_PORT = 'RESERVATION_ENTRY_PORT';

export interface ReservationEntryPort {
  confirmarEntrada(reservaId: string): Promise<void>;
  expirarReserva(reservaId: string, instante: Date): Promise<void>;
}
