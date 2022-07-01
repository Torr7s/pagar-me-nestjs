import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '../decorators/public-key.decorator';

import { UnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    
    if (isPublic) return true;
    
    // @ts-ignore
    const canActivate: Promise<boolean> | boolean = super.canActivate(context);
    
    if (typeof canActivate === 'boolean') return canActivate;
    
    const canActivatePromise = canActivate as Promise<boolean>;
    
    return canActivatePromise.catch((error: any) => {
      if (error instanceof  UnauthorizedError) {
        throw new UnauthorizedError(error.message);
      }
      
      throw new UnauthorizedException();
    })
  }
}