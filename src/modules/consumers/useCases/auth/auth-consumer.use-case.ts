import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConsumersEntity } from '@modules/consumers/infra/prisma/entities/consumers.entity';

import { AuthProviderService } from '@shared/container/providers/auth/services/auth.service';

import { IAuthConsumerRequest } from '@types';

@Injectable()
export class AuthConsumerUseCase {
  constructor(private authProviderService: AuthProviderService) {};
  
  async perform({ email, password }: IAuthConsumerRequest): Promise<{ token: string }> {
    const validConsumer: ConsumersEntity = await this.authProviderService.validateConsumer(email, password);
    
    if (!validConsumer) {
      throw new UnauthorizedException(
        'Invalid credentials provided!'
      );
    }
    
    const token: string = this.authProviderService.signToken(validConsumer.id);
    
    return { token };
  }
}