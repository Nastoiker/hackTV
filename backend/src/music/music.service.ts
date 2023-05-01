import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {PrismaService} from "../prisma/prisma-service";
import {path} from "app-root-path";
import {unlink, writeFile} from "fs-extra";
@Injectable()
export class MusicService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async create( file: Express.Multer.File, img: Express.Multer.File  ,createMusicDto: CreateMusicDto) {
    const uploadFolder = 'uploads/users/' + createMusicDto.userId;
    const extensionImg = img.originalname.split('.');
    createMusicDto.img = uploadFolder + '/music/' + createMusicDto.alias + '.' + extensionImg[extensionImg.length-1]
    const extension = file.originalname.split('.');
    await writeFile(uploadFolder + '/music/' + createMusicDto.alias + '.' + extensionImg[extensionImg.length-1], img.buffer)
    createMusicDto.music_url = uploadFolder + '/music/' + createMusicDto.alias + '.' + extension[extension.length-1]
    await writeFile(uploadFolder + '/music/' + createMusicDto.alias + '.' + extension[extension.length-1], file.buffer)
    return this.prismaService.music.create({
      data: createMusicDto
    });
  }

  async findAll() {
    return this.prismaService.music.findMany({
      where:{},
      include: {
        videos: true,
      },
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
  async remove(id: string) {
    const remove = await this.prismaService.music.findFirst({
      where: {id},
      select: {music_url: true},
    });
    unlink(path +  '/' +  remove.music_url);
    return  this.prismaService.music.delete({
      where:{ id },
    });;
  }
}
