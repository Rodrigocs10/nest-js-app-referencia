import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Usuário',
    type: String,
    example: 'usuario',
  })
  @IsEmail({}, { message: 'Usuário deve ser um email válido' })
  usuario: string;

  @ApiProperty({
    description: 'Senha',
    type: String,
    example: 'as1423',
  })
  @MaxLength(64, { message: 'Senha deve ter no máximo 64 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;
}
