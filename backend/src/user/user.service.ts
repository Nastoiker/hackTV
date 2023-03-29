import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserModel, Prisma, Like, Video} from '@prisma/client';
import {PrismaService} from "../prisma/prisma-service";
import {unlink} from "fs-extra";
import {User} from "./entities/user.entity";
import {path} from "app-root-path";
import {Tag} from "../video/entities/video.entity";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async user(
      userWhereUniqueInput: Prisma.UserModelWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prisma.userModel.findUnique({
      where: userWhereUniqueInput,
    });
  }
  async like(likeById: string, videoId: string): Promise<Like> {
    return this.prisma.like.create({
      data: {
        likeById,
        videoId,
        like: true,
      }
    });
  }
  async unLike(id: string, likeById: string, video: Video): Promise<Like> {
    return this.prisma.like.delete({
      where: {
        id,
      }
    });
  }
  async updateAvatar(user: UserModel, file: Express.Multer.File) {
    if(user.avatar.length > 0) {     await unlink(path + '/uploads/avatar/' + user.avatar); }
    const filePath = path + '/uploads/avatar/' + user.id + '.' +file.mimetype;
    return this.prisma.userModel.update({ where: { id: user.id  }, data: { avatar: user.id + '.' +file.mimetype}});
  }
    async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserModelWhereUniqueInput;
    where?: Prisma.UserModelWhereInput;
    orderBy?: Prisma.UserModelOrderByWithRelationInput;
  }): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userModel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async
  async createUser(data: Prisma.UserModelCreateInput): Promise<UserModel> {
    return this.prisma.userModel.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserModelWhereUniqueInput;
    data: Prisma.UserModelUpdateInput;
  }): Promise<UserModel> {
    const { where, data } = params;
    return this.prisma.userModel.update({
      data,
      where,
    });
  }
  async createTag(name: string): Promise<Tag> {
     const checkExist = await this.prisma.tag.findFirst({ where: {name}});
     if(checkExist) throw Error('tag is Exist');
      return this.prisma.tag.create({data: {name}});
  }
  async followChannel() {
    return '';
  }
  async deleteUser(where: Prisma.UserModelWhereUniqueInput): Promise<UserModel> {
    return this.prisma.userModel.delete({
      where,
    });
  }
}
