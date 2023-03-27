import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma-service";
import {Prisma, UserModel, Video} from "@prisma/client";
import {createVideoDto} from "./dto/create-video.dto";
import {unlink, writeFile} from "fs-extra";
import {path} from "app-root-path";
import {VideoReportDto} from "./dto/report-video.dto";

@Injectable()
export class VideoService {
    constructor(private prisma: PrismaService) {
    }
    async video(
        userWhereUniqueInput: Prisma.VideoWhereUniqueInput,
    ): Promise<Video | null> {
        return this.prisma.video.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async reportVideo(report: VideoReportDto) {
        return this.prisma.reportOnVideo.create({data: {
                ...report
            }});
    }
    async videos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
    }): Promise<Video[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.video.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createVideo(file: Express.Multer.File, data: createVideoDto): Promise<Video> {
        const UploadFolder = `${path}/uploads/videos/${data.userId}/${data.alias}`;
        await writeFile(`${UploadFolder}/${data.name}`, file.buffer);
        // @ts-ignore
        return this.prisma.video.create({data: {...data}});
    }

    async updateVideo(params: {
        where: Prisma.VideoWhereUniqueInput;
        data: Prisma.VideoUpdateInput;
    }): Promise<Video> {
        const { where, data } = params;
        return this.prisma.video.update({
            data,
            where,
        });
    }

    async deleteVideo(where: Prisma.VideoWhereUniqueInput): Promise<Video> {
        const video = await this.prisma.video.findFirst({ where,  select: { userId: true, alias: true},});
        const pathDelete = `uploads/videos/${video.userId}/${video.alias}`;
        await unlink(pathDelete);
        return this.prisma.video.delete({
            where,
        });
    }
}
