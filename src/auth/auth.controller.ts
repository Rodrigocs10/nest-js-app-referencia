import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  HttpException,
  Headers,
  Req,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { TrocaSenhaDto } from './dto/troca-senha.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto.usuario, signInDto.senha);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    /* return usuario from service */
    const usuario = this.authService.getProfile(req);
    return usuario;
  }

  @HttpCode(HttpStatus.OK)
  @Get('esqueci-senha/:email')
  public async enviarEmailEsqueciSenha(
    @Param('email') email: string,
  ): Promise<void> {
    try {
      const emailEnviado = await this.authService.enviarEmailEsqueciSenha(
        email,
      );

      if (emailEnviado == null) {
        throw new HttpException('Email nao enviado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('trocar-senha')
  public async trocarSenha(@Body() trocaSenha: TrocaSenhaDto): Promise<void> {
    try {
      const trocaSenha_ = await this.authService.trocarSenha(trocaSenha);

      if (trocaSenha_ == null) {
        throw new HttpException('Token nao encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  /* refresh token */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  public async refreshToken(@Req() request): Promise<any> {
    try {
      const token = await this.authService.refreshToken(request);

      if (token == null) {
        throw new HttpException('Token nao encontrado', HttpStatus.NOT_FOUND);
      }

      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

}
