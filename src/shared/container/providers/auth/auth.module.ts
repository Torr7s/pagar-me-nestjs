import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthProviderService } from './services/auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';
import { PrismaModule } from '@shared/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.MD5_HASH_KEY,
      signOptions: { 
        expiresIn: '12h' 
      }
    })
  ],
  providers: [
    AuthProviderService,
    LocalStrategy,
    JwtStrategy,
    ConsumersRepository
  ],
  exports: [
    AuthProviderService, 
    JwtModule
  ]
})
export class AuthProviderModule {};