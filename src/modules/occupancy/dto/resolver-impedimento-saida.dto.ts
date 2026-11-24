import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { DecisaoImpedimentoSaida } from '../entities/impedimento-saida.entity.js';

export class ResolverImpedimentoSaidaDto {
  @IsEnum(DecisaoImpedimentoSaida)
  decisao!: DecisaoImpedimentoSaida;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  justificativa!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  operadorId!: string;
}
