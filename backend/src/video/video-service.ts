import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma-service";
import {Prisma, UserModel, Video} from "@prisma/client";
import {createVideoDto} from "./dto/create-video.dto";
import {unlink, writeFile} from "fs-extra";
import {path} from "app-root-path";
import {VideoReportDto} from "./dto/report-video.dto";
import {Tag} from "./entities/video.entity";
import fs from "fs";
 interface tagsOnVideo {
    tag: { connect: { id: string } };
}

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

        const UploadFolder = `${path}/uploads/users/${data.userId}/video/${data.alias}`;
        fs.mkdirSync(`${UploadFolder}`);

        const tagId:Tag[] = [];
        const setTags: tagsOnVideo[] =[]
        for (const id of data.tagId) {
            const checkExistTag = await this.prisma.tag.findFirst({ where: { name: id }, select: {id: true, name: true}})
            if(!checkExistTag) {
                const tag = await this.prisma.tag.create({ data: { name: id }, select: {id: true, name: true}})
                tagId.push(tag);
            } else {
                tagId.push(checkExistTag);
            }
        }

        for (const { id } of tagId) {
            setTags.push({ tag: { connect: { id: id } } });
        }
        data.width = 1080;
        data.height = 1920;
        const extension = file.originalname.split('.');
        await writeFile(`${UploadFolder}/${data.name}.${extension[extension.length-1]}`, file.buffer);
        data.embed_link = `${UploadFolder}/${data.name}.${extension[extension.length-1]}`;
        // @ts-ignore
        return this.prisma.video.create({data: {...data, tag: { create: [...setTags]} }});
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
