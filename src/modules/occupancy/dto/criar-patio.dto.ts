import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CriarPatioDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  nome!: string;
}
