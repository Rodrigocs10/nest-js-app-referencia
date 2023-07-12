import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSenhaEntity } from './entity/token-senha.entity';
import { Repository } from 'typeorm';
import { CreateTokenSenhaDto } from './dto/create-token-senha.dto';

@Injectable()
export class TokenSenhaService {
  async deleteTokenSenha(idTokenSenha: number) {
    return await this.tokenSenhaRepository.delete(idTokenSenha);
  }
  async updateTokenSenha(tokenModel: TokenSenhaEntity) {
    return await this.tokenSenhaRepository.save(tokenModel);
  }
  constructor(
    @InjectRepository(TokenSenhaEntity)
    private readonly tokenSenhaRepository: Repository<TokenSenhaEntity>,
  ) {}

  async getTokenSenhaByEmail(email: string): Promise<TokenSenhaEntity> {
    return await this.tokenSenhaRepository.findOne({ where: { email } });
  }

  async getTokenSenhaByToken(token: string): Promise<TokenSenhaEntity> {
    return await this.tokenSenhaRepository.findOne({ where: { token } });
  }

  /* save tokenSenhaEntity */
  async createTokenSenha(tokenSenha: CreateTokenSenhaDto): Promise<any> {
    const tokenSenhaEntity = new TokenSenhaEntity();
    tokenSenhaEntity.email = tokenSenha.email;
    tokenSenhaEntity.token = tokenSenha.token;

    return await this.tokenSenhaRepository.save(tokenSenhaEntity);
  }
}
