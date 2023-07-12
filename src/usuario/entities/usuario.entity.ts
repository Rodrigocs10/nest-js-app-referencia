import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'usuario' })
  usuario: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'senha' })
  senha: string;
}
