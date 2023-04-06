/// <reference types="multer" />
import { UpdateUserDto } from './dto/update-user.dto';
import { Comment, Like, Prisma, UserModel } from '@prisma/client';
import { PrismaService } from "../prisma/prisma-service";
import { Tag } from "../video/entities/video.entity";
import { CreateCommentDto } from "./dto/createComment-dto";
import { LikeCommentDto } from "./dto/likeComment-dto";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    user(userWhereUniqueInput: Prisma.UserModelWhereUniqueInput): Promise<UserModel | null>;
    createComment(createVideoDto: CreateCommentDto): Promise<Comment>;
    likeComment(likeComment: LikeCommentDto): Promise<Comment>;
    like(likeById: string, videoId: string): Promise<Like>;
    updateAvatar(user: UserModel, file: Express.Multer.File): Promise<UserModel>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserModelWhereUniqueInput;
        where?: Prisma.UserModelWhereInput;
        orderBy?: Prisma.UserModelOrderByWithRelationInput;
    }): Promise<UserModel[]>;
    updateProfile(user: UserModel, file: Express.Multer.File, update: UpdateUserDto): Promise<UserModel>;
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
