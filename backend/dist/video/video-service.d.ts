/// <reference types="multer" />
import { PrismaService } from "../prisma/prisma-service";
import { Prisma, UserModel, Video, Tag } from "@prisma/client";
import { createVideoDto } from "./dto/create-video.dto";
import { VideoReportDto } from "./dto/report-video.dto";
export declare class VideoService {
    private prisma;
    constructor(prisma: PrismaService);
    video(userWhereUniqueInput: Prisma.VideoWhereUniqueInput): Promise<Video | null>;
    reportVideo(report: VideoReportDto): Promise<import(".prisma/client").ReportOnVideo>;
    videos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
    }): Promise<Video[]>;
    tags(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
    }): Promise<Tag[]>;
    videosByCategory(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SecondLevelCategoryWhereUniqueInput;
        where?: Prisma.SecondLevelCategoryWhereInput;
        orderBy?: Prisma.SecondLevelCategoryOrderByWithRelationInput;
    }): Promise<import(".prisma/client").SecondLevelCategory & {
        videos: (Video & {
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: Tag;
            })[];
            authorVideo: UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
            likes: import(".prisma/client").Like[];
            Comment: (import(".prisma/client").Comment & {
                writtenBy: UserModel;
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: UserModel;
                })[];
            })[];
        })[];
    }>;
    createVideo(file: Express.Multer.File, data: createVideoDto): Promise<Video>;
    updateVideo(params: {
        where: Prisma.VideoWhereUniqueInput;
        data: Prisma.VideoUpdateInput;
    }): Promise<Video>;
    deleteVideo(where: Prisma.VideoWhereUniqueInput): Promise<Video>;
}
