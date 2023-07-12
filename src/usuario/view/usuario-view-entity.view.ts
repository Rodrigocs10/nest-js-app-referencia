import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, PrimaryColumn, Column } from 'typeorm';

@ViewEntity('vw_usuario')
export class UsuarioViewEntity {
  @PrimaryColumn({ name: 'id_usuario' })
  @ApiProperty({ description: 'Id do usuário', example: 1 })
  idUsuario: number;

  @Column({ name: 'usuario' })
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Usuário',
  })
  usuario: string;

  @Column({ name: 'email' })
  @ApiProperty({
    description: 'Email do usuário',
    example: 'teste@teste.com',
  })
  email: string;

  @Column({ name: 'id_perfil' })
  @ApiProperty({
    description: 'Id do perfil',
    example: 1,
  })
  idPerfil: number;

  @Column({ name: 'perfil' })
  @ApiProperty({
    description: 'Perfil',
    example: 'Administrador',
  })
  perfil: string;

  @Column({ name: 'cargo' })
  @ApiProperty({
    description: 'Cargo',
    example: 1,
  })
  cargo: string;

  /* avatar */
  @Column({ name: 'avatar' })
  @ApiProperty({
    description: 'Avatar',
  })
  avatar: string;

  /* ativo */
  @Column({ name: 'ativo' })
  @ApiProperty({
    description: 'Ativo',
    example: 1,
  })
  ativo: number;
}
