/// <reference types="multer" />
import { PrismaService } from "../prisma/prisma-service";
import { Prisma, UserModel, Video, Tag, HistoryWatching } from "@prisma/client";
import { createVideoDto } from "./dto/create-video.dto";
import { VideoReportDto } from "./dto/report-video.dto";
export declare class VideoService {
    private prisma;
    constructor(prisma: PrismaService);
    video(userWhereUniqueInput: Prisma.VideoWhereUniqueInput): Promise<Video | null>;
    getSimilarUsers(userId: string): Promise<(UserModel & {
        watching: HistoryWatching[];
    })[]>;
    some<T>(arr: T[], callback: (item: T) => boolean): boolean;
    watchVideo(userId: string | null, videoId: string): Promise<HistoryWatching>;
    videosRecom(userId: string): Promise<Video[]>;
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
            Comment: (import(".prisma/client").Comment & {
                writtenBy: UserModel;
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: UserModel;
                })[];
            })[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: Tag;
            })[];
            authorVideo: UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
            likes: import(".prisma/client").Like[];
            watchers: HistoryWatching[];
        })[];
    }>;
    createVideo(file: Express.Multer.File, data: createVideoDto): Promise<Video>;
    getSearch(value: string): Promise<Video[]>;
    updateVideo(params: {
        where: Prisma.VideoWhereUniqueInput;
        data: Prisma.VideoUpdateInput;
    }): Promise<Video>;
    deleteVideo(id: string): Promise<Video>;
}
