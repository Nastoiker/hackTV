/// <reference types="multer" />
import { PrismaService } from "../prisma/prisma-service";
import { Prisma, Video } from "@prisma/client";
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
    createVideo(file: Express.Multer.File, data: createVideoDto): Promise<Video>;
    updateVideo(params: {
        where: Prisma.VideoWhereUniqueInput;
        data: Prisma.VideoUpdateInput;
    }): Promise<Video>;
    deleteVideo(where: Prisma.VideoWhereUniqueInput): Promise<Video>;
}
