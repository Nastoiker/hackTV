import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoService } from './video/video-service';
import { PrismaService } from './prisma/prisma-service';
import { VideoModule } from './video/video.module';
import { ConvertVideoModule } from './convert-video/convert-video.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [VideoModule, ConvertVideoModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, VideoService, PrismaService],
})
export class AppModule {}
