import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {PrismaService} from "../prisma/prisma-service";
import {path} from "app-root-path";
import {writeFile} from "fs-extra";
@Injectable()
export class MusicService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create( file: Express.Multer.File ,createMusicDto: CreateMusicDto) {
    const uploadFolder = 'uploads/users'
    await writeFile(, file.buffer)
    return this.prismaService.music.create({
      data: createMusicDto
    });
  }

  async findAll() {
    return this.prismaService.music.findMany({
      where:{}
    });
  }

  findOne(id: string) {
    return  this.prismaService.music.findFirst({
      where:{ id }
    });
  }
  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }
  remove(id: string) {
    return  this.prismaService.music.delete({
      where:{ id }
    });;
  }
}
