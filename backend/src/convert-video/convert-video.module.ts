import { Module } from '@nestjs/common';
import { ConvertVideoService } from './convert-video.service';
import { ConvertVideoController } from './convert-video.controller';

@Module({
  controllers: [ConvertVideoController],
  providers: [ConvertVideoService],
})
export class ConvertVideoModule {}
