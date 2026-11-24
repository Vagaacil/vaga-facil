import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import {
  CategoriaDeVagaNaoEncontradaError,
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
  PatioLotadoError,
  PatioNaoEncontradoError,
  RetencaoNaoEncontradaError,
  VeiculoJaNoPatioError,
  VagaDaPermanenciaNaoEncontradaError,
  VagaNaoEncontradaError,
} from '../../modules/occupancy/domain/parking-operations.errors.js';

type MappedDomainError =
  | CategoriaDeVagaNaoEncontradaError
  | PermanenciaJaFechadaError
  | PermanenciaNaoEncontradaError
  | PatioLotadoError
  | PatioNaoEncontradoError
  | RetencaoNaoEncontradaError
  | VeiculoJaNoPatioError
  | VagaDaPermanenciaNaoEncontradaError
  | VagaNaoEncontradaError;

@Catch(
  QueryFailedError,
  CategoriaDeVagaNaoEncontradaError,
  PermanenciaJaFechadaError,
  PermanenciaNaoEncontradaError,
  PatioLotadoError,
  PatioNaoEncontradoError,
  RetencaoNaoEncontradaError,
  VeiculoJaNoPatioError,
  VagaDaPermanenciaNaoEncontradaError,
  VagaNaoEncontradaError,
)
export class DatabaseExceptionFilter implements ExceptionFilter<
  QueryFailedError | MappedDomainError
> {
  catch(
    exception: QueryFailedError | MappedDomainError,
    host: ArgumentsHost,
  ): void {
    const response = host.switchToHttp().getResponse<{
      status(code: number): { json(body: unknown): void };
    }>();

    if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as { code?: string };
      if (driverError.code === '23505') {
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          code: 'CONFLITO_PERSISTENCIA',
          message: 'A operação viola uma regra de unicidade.',
        });
        return;
      }

      response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        code: 'INFRAESTRUTURA_INDISPONIVEL',
        message: 'Não foi possível concluir a operação no banco de dados.',
      });
      return;
    }

    if (
      exception instanceof PatioNaoEncontradoError ||
      exception instanceof PermanenciaNaoEncontradaError ||
      exception instanceof VagaDaPermanenciaNaoEncontradaError ||
      exception instanceof VagaNaoEncontradaError ||
      exception instanceof CategoriaDeVagaNaoEncontradaError
    ) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        code:
          exception instanceof PatioNaoEncontradoError
            ? 'PATIO_NAO_ENCONTRADO'
            : exception instanceof PermanenciaNaoEncontradaError
              ? 'PERMANENCIA_NAO_ENCONTRADA'
              : exception instanceof CategoriaDeVagaNaoEncontradaError
                ? 'CATEGORIA_NAO_ENCONTRADA'
                : 'VAGA_NAO_ENCONTRADA',
        message: exception.message,
      });
      return;
    }

    if (
      exception instanceof PermanenciaJaFechadaError ||
      exception instanceof PatioLotadoError ||
      exception instanceof VeiculoJaNoPatioError ||
      exception instanceof RetencaoNaoEncontradaError
    ) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        code:
          exception instanceof PatioLotadoError
            ? 'PATIO_LOTADO'
            : exception instanceof VeiculoJaNoPatioError
              ? 'VEICULO_JA_NO_PATIO'
              : exception instanceof RetencaoNaoEncontradaError
                ? 'RETENCAO_NAO_ENCONTRADA'
                : 'PERMANENCIA_JA_FECHADA',
        message: exception.message,
      });
    }
  }
}
