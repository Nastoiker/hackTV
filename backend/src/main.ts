import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { PrismaService } from './prisma/prisma-service';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: 'http://localhost:3000',  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, })
  await app.listen(8000);
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app)
}
bootstrap();
