import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ZodValidationPipe, cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cinema CRUD API')
    .setDescription('API de Cinema com NestJS, Prisma e Zod')
    .setVersion('1.0')
    .addTag('users')
    .addTag('cinema')
    .addTag('sala')
    .addTag('filme')
    .addTag('sessao')
    .addTag('ingresso')
    .addTag('pedido')
    .addTag('lanche-combo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const cleanedDocument = cleanupOpenApiDoc(document);
  SwaggerModule.setup('api', app, cleanedDocument);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000/api');
}
bootstrap();
