import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CadastrarMotoristaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  nome!: string;

  @IsEmail()
  email!: string;
}
