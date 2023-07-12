import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioViewEntity } from './view/usuario-view-entity.view';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, UsuarioViewEntity])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
