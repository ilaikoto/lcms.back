import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import type { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
