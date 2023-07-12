import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { Util } from './util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard');
    const request = context.switchToHttp().getRequest();
    const token = Util.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      /* decode token */
      const decoded = await this.jwtService.decode(token);
      const secret = await this.cacheService.get(decoded['email']);

      if (!secret) {
        throw new UnauthorizedException('Secret do token não encontrado');
      }

      console.log('secret', secret);
      const payload = await this.jwtService.verify(token, {
        secret: secret,
      });

      request['user'] = payload;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
