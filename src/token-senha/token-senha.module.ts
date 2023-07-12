import { Module } from '@nestjs/common';
import { TokenSenhaEntity } from './entity/token-senha.entity';
import { TokenSenhaService } from './token-senha.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSenhaEntity])],
  providers: [TokenSenhaService],
  exports: [TokenSenhaService],
})
export class TokenSenhaModule {}
