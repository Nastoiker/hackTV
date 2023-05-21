import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma-service";
import {Prisma, UserModel, Video, Comment, Tag, HistoryWatching} from "@prisma/client";
import {createVideoDto} from "./dto/create-video.dto";
import {unlink, writeFile} from "fs-extra";
import {path} from "app-root-path";
import {VideoReportDto} from "./dto/report-video.dto";
import { mkdirSync } from "fs";
import {SecondLevelCategory} from "../category/entities/category.entity";
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
    async getSimilarUsers(userId: string) {
        const userViewed = await this.prisma.historyWatching.findMany({ where: { userId},
            select: { videoId: true}
        });
        const users = await this.prisma.userModel.findMany({ where:  {  NOT: { id: userId}}, include: { watching: true}
        });
        // const video = await this.prisma.video.findMany({where: { id: { in: user.map( v => v.videoId)}} })
        const usersWithMatchingVideos = users.filter((user) => user.id !== userId).filter((user) => this.some(user.watching,(v) => userViewed.includes(v)));
        return usersWithMatchingVideos;
    }
     some<T>(arr: T[], callback: (item: T) => boolean): boolean {
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                return true;
            }
        }
        return false;
    }
    async watchVideo(userId: string | null, videoId: string): Promise<HistoryWatching> {
        return await this.prisma.historyWatching.create({
            data: {
                userId,
                videoId
            }
        });
    }
    async videosRecom(userId: string): Promise<Video[]> {
        const user = await this.prisma.historyWatching.findMany({ where: { userId},
         select: { videoId: true}
        });
        // return this.getSimilarUsers(userId);
        const video = await this.prisma.video.findMany({where: { id: { in: user.map( v => v.videoId)}} })
        return this.prisma.video.findMany({

                include: {
                    music: true,
                    tag: { include: {tag: true}},
                    authorVideo: { include: { folowers: true }},
                    secondCategory: true,
                    likes: true,
                    Comment: true,
                    watchers: true,
                }
            },
        );
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
                    authorVideo: { include: { folowers: true }},
                    secondCategory: true,
                    likes: true,
                    Comment: true,
                    watchers: true,
                }
            },
        );
    }
    async tags(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
    }): Promise<Tag[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: { videos: true}
        },
            );
    }
    async GetSearchTags(name): Promise<Tag[]> {
        return this.prisma.tag.findMany({
            where: {
                name: {
                    startsWith: name,
                }
            }
        })
    }
    async videosByCategory(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SecondLevelCategoryWhereUniqueInput;
        where?: Prisma.SecondLevelCategoryWhereInput;
        orderBy?: Prisma.SecondLevelCategoryOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.secondLevelCategory.findFirst({
                where,
                include: {
                    videos: {  include: {
                            music: true,
                            tag: { include: {tag: true}},
                            authorVideo: true,
                            secondCategory: true,
                            likes: true,
                            watchers: true,
                        }}
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
        console.log(`${UploadFolder}/${videoDto.name}.${extension[extension.length-1]}`);
        await writeFile(`${UploadFolder}/${videoDto.name}.${extension[extension.length-1]}`, file.buffer);
        videoDto.embed_link = `/users/${data.userId}/video/${data.alias}/${data.name}.${extension[extension.length-1]}`;
        console.log(videoDto);
        const {name, alias, embed_link, userId,share_count, Type,  embed_html, duration, musicId, isActive,cover_image_url, Description, height, width , Title, share_url, secondCategoryId} = videoDto;
        return this.prisma.video.create({data: { name, share_count, embed_html, duration, musicId, alias, embed_link, userId, isActive, Description, cover_image_url, height, Type, width, secondCategoryId, Title, share_url, tag: { create: [...setTags]} }});
    }
    async getSearch(value: string): Promise<Video[]> {
        return this.prisma.video.findMany({

                where: {
                    OR: [
                        {
                            name: {
                                startsWith: value,
                            },
                        },
                        {alias: {startsWith: value}},
                    ],
                },
            include: {
                music: true,
                tag: { include: {tag: true}},
                authorVideo: { include: { folowers: true }},
                secondCategory: true,
                likes: true,
                Comment: true,
                watchers: true,
            }
            },
        );
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

    async commentsVideo(videoId: string): Promise<Comment[] | null> {
        return this.prisma.comment.findMany({
            where: {
                videoId,
            },
            include: { writtenBy: true, userComments: { include: {user: true} }}
        });
    }
    async deleteVideo(id: string) {
        const video = await this.prisma.video.findUnique({ where: {id}});
        const pathDelete = `uploads` + video.embed_link;
       //  const deletePath = pathDelete.split('/')
       //  deletePath.pop();
       // const finishPath = deletePath.join('/');
       //   unlink( path +  '/'+  pathDelete);
        if(!video) return null;
        return  await this.prisma.video.delete({
                where: {id},
        });
    }
}
