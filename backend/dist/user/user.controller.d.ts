/// <reference types="multer" />
import { BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCommentDto } from "./dto/createComment-dto";
import { LikeCommentDto } from "./dto/likeComment-dto";
import { VideoService } from "../video/video-service";
import { CreateCommentOnUserDto } from "../comment/dto/create-comment.dto";
import { CommentService } from "../comment/comment.service";
import { MusicService } from "../music/music.service";
import { CreateMusicDto } from "../music/dto/create-music.dto";
import { createVideoDto } from "../video/dto/create-video.dto";
export declare class UserController {
    private readonly userService;
    private readonly videoService;
    private readonly commentService;
    private readonly musicService;
    constructor(userService: UserService, videoService: VideoService, commentService: CommentService, musicService: MusicService);
    createMusic(query: any, files: Array<Express.Multer.File>, createMusicDto: CreateMusicDto): Promise<import(".prisma/client").Music>;
    createComment(request: any, createCommentDto: CreateCommentDto): Promise<import(".prisma/client").Comment>;
    videosRecom(request: any): Promise<import(".prisma/client").Video[]>;
    getFollowing(req: any): Promise<import(".prisma/client").Folower[] | BadRequestException>;
    likeComment(likeCommentDto: LikeCommentDto): Promise<import(".prisma/client").Comment>;
    WatchVideo(request: any, { videoId }: {
        videoId: string;
    }): Promise<import(".prisma/client").HistoryWatching>;
    createTag(dto: {
        name: string;
    }): Promise<import("../video/entities/video.entity").Tag>;
    updateAvatar(query: any, avatar: Express.Multer.File): Promise<import(".prisma/client").UserModel>;
    updateProfile(query: any, avatar: Express.Multer.File, body: UpdateUserDto): Promise<import(".prisma/client").UserModel>;
    findAll(): Promise<import(".prisma/client").UserModel[]>;
    findOne(id: string): Promise<import(".prisma/client").UserModel>;
    likeVideo(query: any, { videoId }: {
        videoId: string;
    }): Promise<import(".prisma/client").Like>;
    followChannel(query: any, { authorId }: {
        authorId: string;
    }): Promise<import(".prisma/client").Folower>;
    unfollowChannel(query: any, { id, authorId }: {
        id: string;
        authorId: string;
    }): Promise<import(".prisma/client").Folower>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").UserModel>;
    remove(id: string): Promise<import(".prisma/client").UserModel>;
    DeleteVideo(id: string): Promise<import(".prisma/client").Video>;
    DeleteMusic(id: string): Promise<import(".prisma/client").Music>;
    createUserComment(request: any, createCommentOnUserDto: CreateCommentOnUserDto): Promise<import(".prisma/client").UserCommentOnComment>;
    getSearch(search: string): Promise<import(".prisma/client").UserModel[]>;
    createVideo(request: any, video: Express.Multer.File, dto: createVideoDto): Promise<import(".prisma/client").Video>;
}
