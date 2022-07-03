import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

import { PrismaService } from '@shared/prisma/service/prisma.service';

(async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  
  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Swagger Documentation - PagarMe')
    .setDescription(
      'This documentation will list all the functionalities, routes and features of the application.'
    )
    .setVersion('3.4.0')
    .addTag('Consumers')
    .addTag('Payables')
    .addTag('Transactions')
    .build();
  
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);
  
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  
  await app.listen(8080);
})();
