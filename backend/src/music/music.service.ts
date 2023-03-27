import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {PrismaService} from "../prisma/prisma-service";

@Injectable()
export class MusicService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create(createMusicDto: CreateMusicDto) {
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
