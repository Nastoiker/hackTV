import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma-service";
import {Prisma, UserModel, Video} from "@prisma/client";
import {createVideoDto} from "./dto/create-video.dto";
import {unlink, writeFile} from "fs-extra";
import {path} from "app-root-path";
import {VideoReportDto} from "./dto/report-video.dto";
import {Tag} from "./entities/video.entity";
import { mkdirSync } from "fs";
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
            include: {
                music: true,
                tag: { include: {tag: true}},
                authorVideo: true,
                secondCategory: true,
                likes: true,
                Comment: { include: { writtenBy: true, userComments: { include: {user: true} }}}
            }
        },
            );
    }

    async createVideo(file: Express.Multer.File, data: createVideoDto): Promise<Video> {

        const UploadFolder = `${path}/uploads/users/${data.userId}/video/${data.alias}`;
        setTimeout(() => {}, 100);
        mkdirSync(`${UploadFolder}`);
        let { tagId, ...videoDto} = data;
        tagId = tagId.replace(' ', '');
         const strArr = tagId.split(',')
        console.log('lenght ' + strArr);
        const tagIdArr:Tag[] = [];
        const setTags: tagsOnVideo[] =[]
        for (const id of strArr) {
            const checkExistTag = await this.prisma.tag.findUnique({ where: { name: id }, select: {id: true, name: true}})
            if(!checkExistTag) {
                const tag = await this.prisma.tag.create({ data: { name: id }, select: {id: true, name: true}})
                tagIdArr.push(tag);
            } else {
                tagIdArr.push(checkExistTag);
            }
        }

        for (const { id } of tagIdArr) {
            setTags.push({ tag: { connect: { id: id } } });
        }
        videoDto.duration = 0;
        videoDto.isActive = true;
        videoDto.cover_image_url = '';
        videoDto.width = 1080;
        videoDto.height = 1920;
        const extension = file.originalname.split('.');
        await writeFile(`${UploadFolder}/${videoDto.name}.${extension[extension.length-1]}`, file.buffer);
        videoDto.embed_link = `/users/${data.userId}/video/${data.alias}/${data.name}.${extension[extension.length-1]}`;
        console.log(videoDto);
        const {name, alias, embed_link, userId,share_count, Type,  embed_html, duration, musicId, isActive,cover_image_url, Description, height, width , Title, share_url, secondCategoryId} = videoDto;
        return this.prisma.video.create({data: { name, share_count, embed_html, duration, musicId, alias, embed_link, userId, isActive, Description, cover_image_url, height, Type, width, secondCategoryId, Title, share_url, tag: { create: [...setTags]} }});
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
        const video = await this.prisma.video.findFirst({ where,  select: { userId: true, alias: true, embed_link: true},});
        const pathDelete = `uploads` + video.embed_link;
        await unlink( path +  '/'+  pathDelete);
        return this.prisma.video.delete({
            where,
        });
    }
}
