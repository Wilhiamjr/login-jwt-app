import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/app/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { localStrategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [ConfigModule.forRoot(), 
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, localStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
