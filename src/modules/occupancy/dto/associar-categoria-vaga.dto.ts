import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AssociarCategoriaVagaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  categoria!: string;
}
