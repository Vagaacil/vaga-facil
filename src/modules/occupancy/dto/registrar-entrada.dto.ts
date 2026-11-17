import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegistrarEntradaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  placa!: string;
}
