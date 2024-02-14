import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
    }),
  ],
  providers: [AuthResolver, AuthService],


})
export class AuthModule { }
