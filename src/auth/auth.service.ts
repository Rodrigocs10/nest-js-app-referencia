import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenSenhaService } from 'src/token-senha/token-senha.service';
import { CreateTokenSenhaDto } from 'src/token-senha/dto/create-token-senha.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { TrocaSenhaDto } from 'src/auth/dto/troca-senha.dto';
import { CacheService } from 'src/cache/cache.service';
import { Util } from './util';

@Injectable()
export class AuthService {
  getProfile(request: any) {
    const token = Util.extractTokenFromHeader(request);
    const decoded = this.jwtService.decode(token);
    const usuario = this.usersService.getViewUsuarioByEmail(decoded['email']);
    console.log('usuario', usuario);

    return usuario;
  }
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
    private tokenSenhaService: TokenSenhaService,
    private mailerService: MailerService,
    private cacheService: CacheService,
  ) {}

  async trocarSenha(trocaSenha: TrocaSenhaDto): Promise<boolean> {
    console.log(trocaSenha);
    if (trocaSenha.novaSenha != trocaSenha.novaSenhaConfirmacao) {
      throw new HttpException(
        'Senha e confirmacao nao conferem',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.tokenSenhaService.getTokenSenhaByToken(
      trocaSenha.tokenSenha,
    );

    console.log('token', token);
    if (token == null) {
      throw new HttpException('Token nao encontrado', HttpStatus.NOT_FOUND);
    }

    // if token exceeded 15 minutes then delete it and generate invalide token error
    const tokenDate = new Date(token.dataAtualizacao);
    const now = new Date();
    const diff = Math.abs(now.getTime() - tokenDate.getTime());
    const minutes = Math.floor(diff / 1000 / 60);
    console.log('minutes', minutes);

    if (minutes > parseInt(process.env.TOKEN_SENHA_EXPIRACAO_MINUTOS)) {
      const deleted = await this.tokenSenhaService.deleteTokenSenha(
        token.idTokenSenha,
      );

      if (deleted.affected == 0) {
        throw new HttpException('Erro deletando token', HttpStatus.NOT_FOUND);
      }

      console.log('deleted', deleted);
      throw new HttpException('Token expirado', HttpStatus.NOT_FOUND);
    } else {
      const deleted = await this.tokenSenhaService.deleteTokenSenha(
        token.idTokenSenha,
      );

      if (deleted.affected == 0) {
        throw new HttpException('Erro deletando token', HttpStatus.NOT_FOUND);
      }

      const salt = 10;
      const hash = await bcrypt.hash(trocaSenha.novaSenha, salt);

      console.log('senha', trocaSenha.novaSenha);
      console.log('hash', hash);

      const usuario = await this.usersService.getUsuarioByEmail(token.email);

      if (usuario == null) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      usuario.senha = hash;

      const usuarioAtualizado = await this.usersService.updateUsuario(usuario);

      if (usuarioAtualizado == null) {
        throw new HttpException(
          'Erro atualizando usuario',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return true;
  }

  async enviarEmailEsqueciSenha(email: string): Promise<boolean> {
    const usuarioBanco = await this.usersService.getUsuarioByEmail(email);

    console.log('usuarioBanco', usuarioBanco);

    if (usuarioBanco == null) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const tokenModel = await this.buscarTokenSenhaEsquecida(email);

    // Encontrou token criado anteriormente. Entao atualiza o token
    if (tokenModel) {
      const mail = {
        to: tokenModel.email,
        from: 'noreply@nibracon.com.br',
        subject: 'Recuperação de senha',
        template: 'email-troca-senha',
        context: {
          token: tokenModel.token,
        },
      };

      console.log('.... enviando email ....');
      console.log(mail);
      await this.mailerService.sendMail(mail);

      tokenModel.token = this.gerarStringAleatorio();

      const tokenSenha = await this.tokenSenhaService.updateTokenSenha(
        tokenModel,
      );

      if (tokenSenha == null) {
        throw new HttpException('Erro atualizando token', HttpStatus.NOT_FOUND);
      }
    } else {
      // create new tokenSenhaEntity and save it
      const tokenModel = new CreateTokenSenhaDto();
      tokenModel.email = email;
      tokenModel.token = this.gerarStringAleatorio();

      const tokenSenha = await this.tokenSenhaService.createTokenSenha(
        tokenModel,
      );
      if (tokenSenha == null) {
        throw new HttpException('Erro criando token', HttpStatus.NOT_FOUND);
      }
    }

    return true;
  }

  async buscarTokenSenhaEsquecida(email: string) {
    const senhaEsquecida = await this.tokenSenhaService.getTokenSenhaByEmail(
      email,
    );

    return senhaEsquecida;
  }

  async signIn(email: string, senha_: string): Promise<any> {
    // TODO: Generate a JWT and return it here

    const user = await this.usersService.getUsuarioByEmail(email);
    console.log('user', user);

    if (user == null) {
      throw new UnauthorizedException();
    }

    /* gerando hash da senha. Colocar no cadastro de usuario */
    // const salt = 10;
    // const hash = await bcrypt.hash(senha_, salt);

    // console.log('senha', senha_);
    // console.log('hash', hash);
    // //console.log(user.senha);

    const isMatch = await bcrypt.compare(senha_, user.senha);
    console.log('match', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.idUsuario,
      username: user.usuario,
      email: user.email,
    };

    //let secret = await this.cacheService.get('secret');
    let secret = null;

    /* gerando string aleatoria para secret */
    secret = this.gerarStringAleatorio();
    console.log('payload.email', payload.email);
    await this.cacheService.set(payload.email, secret);

    console.log('process.env.JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: secret,
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
      }),
    };
  }

  private gerarStringAleatorio(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /* refresh token */
  async refreshToken(request: any): Promise<any> {
    const token = Util.extractTokenFromHeader(request);
    const decoded = await this.jwtService.decode(token);

    console.log('--------------- email -------------', decoded['email']);
    const email = decoded['email'];

    const secret = await this.cacheService.get(email);

    if (secret == null) {
      throw new UnauthorizedException();
    }

    const generated_secret = this.gerarStringAleatorio();
    await this.cacheService.set(email, generated_secret);

    console.log(decoded['email'], this.gerarStringAleatorio());

    const payload = {
      sub: decoded['sub'],
      username: decoded['username'],
      email: decoded['email'],
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: generated_secret,
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
      }),
    };
  }
}
