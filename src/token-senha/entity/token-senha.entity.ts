import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token_senha')
export class TokenSenhaEntity {
  @PrimaryGeneratedColumn({ name: 'id_token_senha' })
  idTokenSenha: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'token' })
  token: string;

  @Column({ name: 'atualizado' })
  dataAtualizacao: Date;
}
