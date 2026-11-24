import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class CadastrarVeiculoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  placa!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  tipo?: string;
}
