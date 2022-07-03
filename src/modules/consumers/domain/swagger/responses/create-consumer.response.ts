import { ApiProperty } from '@nestjs/swagger';

import { Consumers } from '@prisma/client';

export class CreateConsumerResponse implements Consumers {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
}