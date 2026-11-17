import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class CriarVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  codigo!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  categoria?: string;
}
