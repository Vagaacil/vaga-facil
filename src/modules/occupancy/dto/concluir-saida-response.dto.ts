import { PaymentStatusEnum } from '../../../common/enums/payment-status.enum.js';

export class ConcluirSaidaResponseDto {
  constructor(
    public readonly registroId: string,
    public readonly placa: string,
    public readonly vagaId: string,
    public readonly horarioSaida: Date,
    public readonly valorCobrado: number,
    public readonly pagamentoId: string,
    public readonly statusPagamento: PaymentStatusEnum,
  ) {}
}
