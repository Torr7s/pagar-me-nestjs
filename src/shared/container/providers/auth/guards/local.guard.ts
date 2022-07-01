import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> | boolean {
    return super.canActivate(context);
  }
  
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }
    
    return user;
  }
}