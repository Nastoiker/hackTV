import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConvertVideoService } from './convert-video.service';
import { CreateConvertVideoDto } from './dto/create-convert-video.dto';
import { UpdateConvertVideoDto } from './dto/update-convert-video.dto';

@Controller('convert-video')
export class ConvertVideoController {
  constructor(private readonly convertVideoService: ConvertVideoService) {}

  @Post()
  create(@Body() createConvertVideoDto: CreateConvertVideoDto) {
    return this.convertVideoService.create(createConvertVideoDto);
  }

  @Get()
  findAll() {
    return this.convertVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convertVideoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConvertVideoDto: UpdateConvertVideoDto,
  ) {
    return this.convertVideoService.update(+id, updateConvertVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convertVideoService.remove(+id);
  }
}
