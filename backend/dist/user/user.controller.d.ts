/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").UserModel>;
    createTag(dto: {
        name: string;
    }): Promise<import("../video/entities/video.entity").Tag>;
    updateAvatar(query: any, avatar: Express.Multer.File): Promise<import(".prisma/client").UserModel>;
    findAll(): Promise<import(".prisma/client").UserModel[]>;
    findOne(id: string): Promise<import(".prisma/client").UserModel>;
    likeVideo(query: any, { videoId }: {
        videoId: string;
    }): Promise<import(".prisma/client").Like>;
    followChannel(query: any, { authorId }: {
        authorId: string;
    }): Promise<void>;
    unfollowChannel(query: any, { authorId }: {
        authorId: string;
    }): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").UserModel>;
    remove(id: string): Promise<import(".prisma/client").UserModel>;
}
