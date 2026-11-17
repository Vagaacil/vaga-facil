import {
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CriarCategoriaVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  descricao!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @IsString({ each: true })
  tiposVeiculoCompativeis?: string[];
}
