import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TokenSenhaModule } from './token-senha/token-senha.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseModule),
    MailerModule.forRoot(mailerConfig),
    AuthModule,
    UsuarioModule,
    TokenSenhaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
