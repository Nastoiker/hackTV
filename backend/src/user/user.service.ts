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
    include: { Comment: true, folowers: true, folowing: true, videos: true, music: true  }
    });
  }
  async like(likeById: string, videoId: string): Promise<Like> {
    const checkExist = await this.prisma.like.findMany({where: {
        likeById
      },
    select: {videoId: true, id: true}});
    let checkExistVideo = { videoId: null, likeId: null, exist: false};
    checkExist.forEach( c => { if(videoId=== c.videoId) { return checkExistVideo = { videoId: c.videoId, likeId: c.id, exist: true}}})

    if(checkExistVideo.exist) {
      const likesCountVideo = await this.prisma.video.findUnique({where: {
          id: checkExistVideo.videoId
        },
        select: { likesCount: true}
        })
      await this.prisma.video.update({where: {
        id: checkExistVideo.videoId
        },
      data: {
        likesCount: likesCountVideo.likesCount - 1
      }})
      return await this.prisma.like.delete({where: {
         id: checkExistVideo.likeId,
        }});
    }
    const likesCountVideo = await this.prisma.video.findUnique({where: {
        id: videoId
      },
      select: { likesCount: true}
    })
    await this.prisma.video.update({where: {
        id: videoId
      },
      data: {
        likesCount: likesCountVideo.likesCount + 1
      }})
    console.log(checkExistVideo);
    return this.prisma.like.create({
      data: {
        likeById,
        videoId,
        like: true,
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
  async unfollowChannel(userId: string, authorId: string) {
    const folow = await  this.prisma.folower.delete({
      where: {
        userId,
        authorId
      }
    });
    if(!folow) { return };
    const user =  await this.prisma.userModel.findUnique({
      where: {
        id: userId
      },
      select: {following_count: true}
    })
    const author =  await this.prisma.userModel.findUnique({ where: {
        id: authorId
      },
      select: {subscribers_count: true}
    })
    await  this.prisma.userModel.update({
      where: {
        id: userId
      },
      data: {
        following_count:  user.following_count - 1,
      }
    });
    await  this.prisma.userModel.update({
      where: {
        id: authorId
      },
      data: {
        subscribers_count: author.subscribers_count - 1,
      }
    });
  }
  async followChannel(userId: string, authorId: string) {
    const folow = await  this.prisma.folower.create({
      data: {
        userId,
        authorId
      }
    });
    if(!folow) { return };
    const user =  await this.prisma.userModel.findUnique({
      where: {
        id: userId
      },
      select: {following_count: true}
    })
    const author =  await this.prisma.userModel.findUnique({ where: {
        id: authorId
      },
    select: {subscribers_count: true}
    })
    await  this.prisma.userModel.update({
      where: {
        id: userId
      },
      data: {
        following_count:  user.following_count + 1,
      }
    });
    await  this.prisma.userModel.update({
      where: {
        id: authorId
      },
      data: {
        subscribers_count: author.subscribers_count + 1,
      }
    });
  }
  async deleteUser(where: Prisma.UserModelWhereUniqueInput): Promise<UserModel> {
    return this.prisma.userModel.delete({
      where,
    });
  }
}
