import { Consumers } from '@prisma/client';

import { IJWTPayload } from '@types';

export interface IAuthProviderService {
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string, salt: number): Promise<string>;
  signToken(sub: string): string;
  validateConsumer(email: string, password: string): Promise<Consumers | null>;
  verifyToken(token: string): IJWTPayload;
}
