import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CLOCK_PORT, type ClockPort } from '../domain/clock.port.js';
import {
  PatioLotadoError,
  PatioNaoEncontradoError,
  VeiculoJaNoPatioError,
} from '../domain/parking-operations.errors.js';
import {
  PARKING_OPERATIONS_REPOSITORY,
  type ParkingOperationsRepository,
} from '../domain/parking-operations.repository.interface.js';
import { Placa } from '../domain/placa.js';

export interface RegistrarEntradaCommand {
  patioId: string;
  placa: string;
}

@Injectable()
export class RegistrarEntradaHandler {
  constructor(
    @Inject(PARKING_OPERATIONS_REPOSITORY)
    private readonly repository: ParkingOperationsRepository,
    @Inject(CLOCK_PORT) private readonly clock: ClockPort,
  ) {}

  async executar(command: RegistrarEntradaCommand) {
    const patio = await this.repository.findPatio(command.patioId);
    if (!patio) {
      throw new PatioNaoEncontradoError(command.patioId);
    }
    const placa = Placa.criar(command.placa);
    const horarioEntrada = this.clock.agora();

    for (let tentativa = 0; tentativa < 3; tentativa += 1) {
      try {
        return await this.repository.registrarEntrada(
          command.patioId,
          placa.valor,
          horarioEntrada,
          randomUUID(),
        );
      } catch (error) {
        if (
          error instanceof PatioLotadoError ||
          error instanceof VeiculoJaNoPatioError
        ) {
          throw error;
        }
        if (!isUniqueViolation(error) || tentativa === 2) {
          throw error;
        }
      }
    }
    throw new Error('Falha inesperada ao registrar entrada.');
  }
}

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const candidate = error as {
    code?: unknown;
    driverError?: { code?: unknown };
  };
  return candidate.code === '23505' || candidate.driverError?.code === '23505';
}
