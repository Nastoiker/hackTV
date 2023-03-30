import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param, ParseFilePipeBuilder,
  Post,
  Query, Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {MusicService} from './music.service';
import {CreateMusicDto} from './dto/create-music.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('music'))
  create(@Req() query, @UploadedFile() music: Express.Multer.File, @Body() createMusicDto: CreateMusicDto) {
    console.log('user' +  query.user);
    createMusicDto.userId = query.user.id;
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
