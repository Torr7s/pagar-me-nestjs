import { hash, compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Consumers } from '@prisma/client';
import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';

import { IAuthProviderService } from '../domain/auth.interface';

import { IJWTPayload } from '@types';

@Injectable()
export class AuthProviderService implements IAuthProviderService {
  constructor(
    private jwtService: JwtService,
    private consumersRepository: ConsumersRepository
  ) {};
  
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
  
  async hashPassword(password: string, salt: number = 9): Promise<string> {
    return await hash(password, salt);
  }
  
  signToken(sub: string): string {
    return this.jwtService.sign({ sub });
  }
  
  async validateConsumer(email: string, password: string): Promise<Consumers | null> {
    let result: Consumers | null;
    
    const consumer: Consumers = await this.consumersRepository.findByEmail(email);
    
    if (consumer) {
      const validPassword: boolean = await this.comparePasswords(password, consumer.password);
      
      result = validPassword ? { ...consumer, password: undefined } : null;
    }
    
    return result;
  }
  
  verifyToken(token: string): IJWTPayload {
    return this.jwtService.verify(token);
  }
}