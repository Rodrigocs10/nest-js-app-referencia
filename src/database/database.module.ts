import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'; // <- this line is the important

import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { TokenSenhaEntity } from 'src/token-senha/entity/token-senha.entity';
import { UsuarioViewEntity } from 'src/usuario/view/usuario-view-entity.view';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [UsuarioEntity, TokenSenhaEntity, UsuarioViewEntity],
};
export const DatabaseModule = config;
