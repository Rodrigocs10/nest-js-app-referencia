import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioViewEntity } from './view/usuario-view-entity.view';

export type Usuario = any;

@Injectable()
export class UsuarioService {
  updateUsuario(usuario: UsuarioEntity) {
    return this.usuarioRepository.save(usuario);
  }
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(UsuarioViewEntity)
    private readonly viewUsuarios: Repository<UsuarioViewEntity>,
  ) {}

  /* async getUsuarioByEmail */
  async getUsuarioByEmail(email: string): Promise<UsuarioEntity> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  async getViewUsuarioByEmail(email: string): Promise<UsuarioViewEntity> {
    return await this.viewUsuarios.findOne({ where: { email } });
  }

}
