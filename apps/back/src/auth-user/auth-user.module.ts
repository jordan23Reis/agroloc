import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        secret: configSecret.get('jwtSecret'),
        signOptions: { expiresIn: `${configSecret.get('jwtExpireTime')}s` },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtStrategy, LocalStrategy],
  exports: [AuthUserService]
})
export class AuthUserModule {}
