import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
    }),

  ],

  providers: [AuthResolver, AuthService, JwtStrategy],

})
export class AuthModule { }
