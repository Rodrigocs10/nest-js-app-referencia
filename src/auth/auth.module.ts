import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtService } from '@nestjs/jwt';
import { TokenSenhaModule } from 'src/token-senha/token-senha.module';
import { CacheModule } from 'src/cache/cache.module';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    UsuarioModule,
    TokenSenhaModule,
    CacheModule,
    // JwtModule.registerAsync({
    //   imports: [AuthModule],
    //   inject: [CacheService],
    //   useFactory: async (cacheService: CacheService) => {
    //     const secret = await cacheService.get('secret');
    //     return {
    //       secret,
    //       signOptions: { expiresIn: '1d' },
    //     };
    //   },
    // }),
    // JwtModule.registerAsync({
    //   useClass: JwtConfigService,
    // }),
    // JwtModule.register({
    //   global: true,
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
