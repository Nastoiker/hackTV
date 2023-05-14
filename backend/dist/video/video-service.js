"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma-service");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
const fs_1 = require("fs");
let VideoService = class VideoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async video(userWhereUniqueInput) {
        return this.prisma.video.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async getSimilarUsers(userId) {
        const userViewed = await this.prisma.historyWatching.findMany({ where: { userId },
            select: { videoId: true }
        });
        const users = await this.prisma.userModel.findMany({ where: { NOT: { id: userId } }, include: { watching: true }
        });
        const usersWithMatchingVideos = users.filter((user) => user.id !== userId).filter((user) => this.some(user.watching, (v) => userViewed.includes(v)));
        return usersWithMatchingVideos;
    }
    some(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                return true;
            }
        }
        return false;
    }
    async watchVideo(userId, videoId) {
        return await this.prisma.historyWatching.create({
            data: {
                userId,
                videoId
            }
        });
    }
    async videosRecom(userId) {
        const user = await this.prisma.historyWatching.findMany({ where: { userId },
            select: { videoId: true }
        });
        const video = await this.prisma.video.findMany({ where: { id: { in: user.map(v => v.videoId) } } });
        return this.prisma.video.findMany({
            include: {
                music: true,
                tag: { include: { tag: true } },
                authorVideo: { include: { folowers: true } },
                secondCategory: true,
                likes: true,
                Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } },
                watchers: true,
            }
        });
    }
    async reportVideo(report) {
        return this.prisma.reportOnVideo.create({ data: Object.assign({}, report) });
    }
    async videos(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.video.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                music: true,
                tag: { include: { tag: true } },
                authorVideo: { include: { folowers: true } },
                secondCategory: true,
                likes: true,
                Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } },
                watchers: true,
            }
        });
    }
    async tags(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: { videos: true }
        });
    }
    async GetSearchTags(name) {
        return this.prisma.tag.findMany({
            where: {
                name: {
                    startsWith: name,
                }
            }
        });
    }
    async videosByCategory(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.secondLevelCategory.findFirst({
            where,
            include: {
                videos: { include: {
                        music: true,
                        tag: { include: { tag: true } },
                        authorVideo: true,
                        secondCategory: true,
                        likes: true,
                        Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } },
                        watchers: true,
                    } }
            }
        });
    }
    async createVideo(file, data) {
        const UploadFolder = `${app_root_path_1.path}/uploads/users/${data.userId}/video/${data.alias}`;
        setTimeout(() => { }, 100);
        (0, fs_1.mkdirSync)(`${UploadFolder}`);
        let { tagId } = data, videoDto = __rest(data, ["tagId"]);
        tagId = tagId.replace(' ', '');
        const strArr = tagId.split(',');
        console.log('lenght ' + strArr);
        const tagIdArr = [];
        const setTags = [];
        for (const id of strArr) {
            const checkExistTag = await this.prisma.tag.findUnique({ where: { name: id }, select: { id: true, name: true } });
            if (!checkExistTag) {
                const tag = await this.prisma.tag.create({ data: { name: id }, select: { id: true, name: true } });
                tagIdArr.push(tag);
            }
            else {
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
        console.log(`${UploadFolder}/${videoDto.name}.${extension[extension.length - 1]}`);
        await (0, fs_extra_1.writeFile)(`${UploadFolder}/${videoDto.name}.${extension[extension.length - 1]}`, file.buffer);
        videoDto.embed_link = `/users/${data.userId}/video/${data.alias}/${data.name}.${extension[extension.length - 1]}`;
        console.log(videoDto);
        const { name, alias, embed_link, userId, share_count, Type, embed_html, duration, musicId, isActive, cover_image_url, Description, height, width, Title, share_url, secondCategoryId } = videoDto;
        return this.prisma.video.create({ data: { name, share_count, embed_html, duration, musicId, alias, embed_link, userId, isActive, Description, cover_image_url, height, Type, width, secondCategoryId, Title, share_url, tag: { create: [...setTags] } } });
    }
    async getSearch(value) {
        return this.prisma.video.findMany({
            where: {
                OR: [
                    {
                        name: {
                            startsWith: value,
                        },
                    },
                    { alias: { startsWith: value } },
                ],
            },
            include: {
                music: true,
                tag: { include: { tag: true } },
                authorVideo: { include: { folowers: true } },
                secondCategory: true,
                likes: true,
                Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } },
                watchers: true,
            }
        });
    }
    async updateVideo(params) {
        const { where, data } = params;
        return this.prisma.video.update({
            data,
            where,
        });
    }
    async deleteVideo(id) {
        const video = await this.prisma.video.findUnique({ where: { id } });
        const pathDelete = `uploads` + video.embed_link;
        if (!video)
            return null;
        return await this.prisma.video.delete({
            where: { id },
        });
    }
};
VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video-service.js.map