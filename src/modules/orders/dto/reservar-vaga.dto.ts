import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class ReservarVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  patioId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  motoristaId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  veiculoId!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  categoria?: string;
}
