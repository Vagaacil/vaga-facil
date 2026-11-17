import {
  IsDateString,
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class DefinirTarifaDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0.01)
  valorPorHora!: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(1)
  @Max(60)
  fracaoMinutos?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  toleranciaMinutos?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsDateString()
  vigenteDesde?: string;
}
