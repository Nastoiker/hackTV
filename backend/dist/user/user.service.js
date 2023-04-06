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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma-service");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async user(userWhereUniqueInput) {
        return this.prisma.userModel.findUnique({
            where: userWhereUniqueInput,
            include: { Comment: true, folowers: true, folowing: true, videos: { include: { music: true,
                        tag: { include: { tag: true } },
                        authorVideo: true,
                        secondCategory: true,
                        likes: { include: { videos: true } },
                        Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } } } }, music: true }
        });
    }
    async createComment(createVideoDto) {
        return await this.prisma.comment.create({
            data: Object.assign({}, createVideoDto)
        });
    }
    async likeComment(likeComment) {
        const checkExist = await this.prisma.comment.findUnique({
            where: {
                id: likeComment.commentId
            },
            select: {
                likeCount: true
            }
        });
        return await this.prisma.comment.update({
            where: {
                id: likeComment.commentId
            },
            data: {
                likeCount: checkExist.likeCount + 1,
            }
        });
    }
    async like(likeById, videoId) {
        const checkExist = await this.prisma.like.findMany({ where: {
                likeById
            },
            select: { videoId: true, id: true } });
        let checkExistVideo = { videoId: null, likeId: null, exist: false };
        checkExist.forEach(c => { if (videoId === c.videoId) {
            return checkExistVideo = { videoId: c.videoId, likeId: c.id, exist: true };
        } });
        if (checkExistVideo.exist) {
            const likesCountVideo = await this.prisma.video.findUnique({ where: {
                    id: checkExistVideo.videoId
                },
                select: { likesCount: true }
            });
            await this.prisma.video.update({ where: {
                    id: checkExistVideo.videoId
                },
                data: {
                    likesCount: likesCountVideo.likesCount - 1
                } });
            return await this.prisma.like.delete({ where: {
                    id: checkExistVideo.likeId,
                } });
        }
        const likesCountVideo = await this.prisma.video.findUnique({ where: {
                id: videoId
            },
            select: { likesCount: true }
        });
        await this.prisma.video.update({ where: {
                id: videoId
            },
            data: {
                likesCount: likesCountVideo.likesCount + 1
            } });
        console.log(checkExistVideo);
        return this.prisma.like.create({
            data: {
                likeById,
                videoId,
                like: true,
            }
        });
    }
    async updateAvatar(user, file) {
        if (user.avatar && user.avatar.length > 0) {
            await (0, fs_extra_1.unlink)(app_root_path_1.path + user.avatar);
        }
        const extension = file.originalname.split('.');
        const filePath = app_root_path_1.path + '/uploads/users/' + user.id + '/avatar/' + user.id + '.' + extension[extension.length - 1];
        await (0, fs_extra_1.writeFile)(filePath, file.buffer);
        return this.prisma.userModel.update({ where: { id: user.id }, data: { avatar: '/uploads/users/' + user.id + '/avatar/' + user.id + '.' + extension[extension.length - 1] } });
    }
    async users(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.userModel.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async updateProfile(user, file, update) {
        if (user.avatar && user.avatar.length > 0) {
            await (0, fs_extra_1.unlink)(app_root_path_1.path + user.avatar);
        }
        const extension = file.originalname.split('.');
        const filePath = app_root_path_1.path + '/uploads/users/' + user.id + '/avatar/' + user.id + '.' + extension[extension.length - 1];
        await (0, fs_extra_1.writeFile)(filePath, file.buffer);
        return this.prisma.userModel.update({ where: { id: user.id }, data: { login: update.login, phone: update.phone, hashpassword: update.password, avatar: '/uploads/users/' + user.id + '/avatar/' + user.id + '.' + extension[extension.length - 1] } });
    }
    async createUser(data) {
        return this.prisma.userModel.create({
            data,
        });
    }
    async updateUser(params) {
        const { where, data } = params;
        return this.prisma.userModel.update({
            data,
            where,
        });
    }
    async createTag(name) {
        const checkExist = await this.prisma.tag.findFirst({ where: { name } });
        if (checkExist)
            throw Error('tag is Exist');
        return this.prisma.tag.create({ data: { name } });
    }
    async unfollowChannel(userId, authorId) {
        const folow = await this.prisma.folower.delete({
            where: {
                userId,
                authorId
            }
        });
        if (!folow) {
            return;
        }
        ;
        const user = await this.prisma.userModel.findUnique({
            where: {
                id: userId
            },
            select: { following_count: true }
        });
        const author = await this.prisma.userModel.findUnique({ where: {
                id: authorId
            },
            select: { subscribers_count: true }
        });
        await this.prisma.userModel.update({
            where: {
                id: userId
            },
            data: {
                following_count: user.following_count - 1,
            }
        });
        await this.prisma.userModel.update({
            where: {
                id: authorId
            },
            data: {
                subscribers_count: author.subscribers_count - 1,
            }
        });
    }
    async followChannel(userId, authorId) {
        const folow = await this.prisma.folower.create({
            data: {
                userId,
                authorId
            }
        });
        if (!folow) {
            return;
        }
        ;
        const user = await this.prisma.userModel.findUnique({
            where: {
                id: userId
            },
            select: { following_count: true }
        });
        const author = await this.prisma.userModel.findUnique({ where: {
                id: authorId
            },
            select: { subscribers_count: true }
        });
        await this.prisma.userModel.update({
            where: {
                id: userId
            },
            data: {
                following_count: user.following_count + 1,
            }
        });
        await this.prisma.userModel.update({
            where: {
                id: authorId
            },
            data: {
                subscribers_count: author.subscribers_count + 1,
            }
        });
    }
    async deleteUser(where) {
        return this.prisma.userModel.delete({
            where,
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map