import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TrocaSenhaDto {
  @ApiProperty({
    description: 'Token de recuperação de senha',
    type: String,
    example: 'sjslkskjslksjlkjslksjslk',
  })
  @IsNotEmpty({ message: 'Token de recuperação de senha é obrigatório' })
  tokenSenha: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    type: String,
    example: '123456',
  })
  @IsNotEmpty({ message: 'Nova senha do usuário é obrigatória' })
  novaSenha: string;

  @ApiProperty({
    description: 'Confirmação da nova senha do usuário',
    type: String,
    example: '123456',
  })
  @IsNotEmpty({
    message: 'Confirmação da nova senha do usuário é obrigatórioa',
  })
  novaSenhaConfirmacao: string;
}
