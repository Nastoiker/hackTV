import {Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  @Post()
  @UseInterceptors(FileInterceptor('music'))
  create(@UploadedFile() music: Express.Multer.File, @Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(music, createMusicDto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(id);
  }
}
