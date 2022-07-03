import { ApiProperty } from '@nestjs/swagger';

export class AuthConsumerResponse {
  @ApiProperty()
  message: string;
  
  @ApiProperty()
  access_token: string;
}