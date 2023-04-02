/// <reference types="multer" />
import { UserModel, Prisma, Like } from '@prisma/client';
import { PrismaService } from "../prisma/prisma-service";
import { Tag } from "../video/entities/video.entity";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    user(userWhereUniqueInput: Prisma.UserModelWhereUniqueInput): Promise<UserModel | null>;
    like(likeById: string, videoId: string): Promise<Like>;
    updateAvatar(user: UserModel, file: Express.Multer.File): Promise<UserModel>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserModelWhereUniqueInput;
        where?: Prisma.UserModelWhereInput;
        orderBy?: Prisma.UserModelOrderByWithRelationInput;
    }): Promise<UserModel[]>;
    createUser(data: Prisma.UserModelCreateInput): Promise<UserModel>;
    updateUser(params: {
        where: Prisma.UserModelWhereUniqueInput;
        data: Prisma.UserModelUpdateInput;
    }): Promise<UserModel>;
    createTag(name: string): Promise<Tag>;
    unfollowChannel(userId: string, authorId: string): Promise<void>;
    followChannel(userId: string, authorId: string): Promise<void>;
    deleteUser(where: Prisma.UserModelWhereUniqueInput): Promise<UserModel>;
}
