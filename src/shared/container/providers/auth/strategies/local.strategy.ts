import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { Consumers } from '@prisma/client';

import { AuthProviderService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authProviderService: AuthProviderService) {
    super({
      usernameField: 'email'
    });
  }
  
  validate(email: string, password: string): Promise<Consumers> {
    return this.authProviderService.validateConsumer(email, password);
  }
}