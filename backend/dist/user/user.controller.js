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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const createComment_dto_1 = require("./dto/createComment-dto");
const likeComment_dto_1 = require("./dto/likeComment-dto");
const video_service_1 = require("../video/video-service");
const create_comment_dto_1 = require("../comment/dto/create-comment.dto");
const comment_service_1 = require("../comment/comment.service");
const idValidation_pipe_1 = require("../pipes/idValidation.pipe");
const video_constants_1 = require("../video/video.constants");
const music_service_1 = require("../music/music.service");
const create_music_dto_1 = require("../music/dto/create-music.dto");
const create_video_dto_1 = require("../video/dto/create-video.dto");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
const ffmpeg = require("fluent-ffmpeg");
let UserController = class UserController {
    constructor(userService, videoService, commentService, musicService) {
        this.userService = userService;
        this.videoService = videoService;
        this.commentService = commentService;
        this.musicService = musicService;
    }
    createMusic(query, files, createMusicDto) {
        console.log('user' + query.user);
        createMusicDto.userId = query.user.id;
        console.log(files);
        return this.musicService.create(files[0], files[1], createMusicDto);
    }
    createComment(request, createCommentDto) {
        createCommentDto.writtenById = request.user.id;
        return this.commentService.createCommentDto(createCommentDto);
    }
    async videosRecom(request) {
        const user = request.user.id;
        const product = await this.videoService.videosRecom(user);
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    async getFollowing(req) {
        const userId = req.user.id;
        const folows = await this.userService.getFolows(userId);
        if (!folows) {
            return new common_1.BadRequestException('failed');
        }
        return folows;
    }
    likeComment(likeCommentDto) {
        return this.userService.likeComment(likeCommentDto);
    }
    async WatchVideo(request, { videoId }) {
        var _a;
        const user = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
        const product = await this.videoService.watchVideo(user, videoId);
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    createTag(dto) {
        return this.userService.createTag(dto.name);
    }
    async updateAvatar(query, avatar) {
        return this.userService.updateAvatar(query.user, avatar);
    }
    async updateProfile(query, avatar, body) {
        return this.userService.updateProfile(query.user, avatar, body);
    }
    findAll() {
        return this.userService.users({});
    }
    findOne(id) {
        return this.userService.user({ id });
    }
    likeVideo(query, { videoId }) {
        const userId = query.user.id;
        return this.userService.like(userId, videoId);
    }
    followChannel(query, { authorId }) {
        const userId = query.user.id;
        return this.userService.followChannel(userId, authorId);
    }
    unfollowChannel(query, { id, authorId }) {
        const userId = query.user.id;
        if (!userId)
            return;
        return this.userService.unfollowChannel(id, userId, authorId);
    }
    update(id, updateUserDto) {
        return this.userService.updateUser({ where: { id }, data: updateUserDto });
    }
    remove(id) {
        return this.userService.deleteUser({ id });
    }
    DeleteVideo(id) {
        const res = id.slice(1, id.length);
        return this.videoService.deleteVideo(res);
    }
    createUserComment(request, createCommentOnUserDto) {
        createCommentOnUserDto.userId = request.user.id;
        return this.commentService.createCommentOnUserDto(createCommentOnUserDto);
    }
    async getSearch(search) {
        const searchValue = search.slice(1, search.length);
        const product = await this.userService.getSearch(searchValue);
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    async createVideo(request, video, dto) {
        if (!video) {
            throw new common_1.BadRequestException('Please upload a video file.');
        }
        if (video.mimetype !== 'video/mp4') {
            throw new common_1.BadRequestException('Only MP4 videos are allowed.');
        }
        console.log(dto);
        dto.userId = request.user.id;
        const inputPath = video.path;
        const outputPath = `${inputPath}.mp4`;
        const UploadFolder = `${app_root_path_1.path}/uploads/videos`;
        await (0, fs_extra_1.writeFile)(`${UploadFolder}/${video.originalname}`, video.buffer);
        const videopath = `${UploadFolder}/${video.originalname}`;
        console.log(videopath);
        console.log('start convert');
        await new Promise((resolve, reject) => {
            ffmpeg(videopath)
                .output(UploadFolder + '/converted/' + video.originalname)
                .audioCodec('copy')
                .audioChannels(2)
                .size('1080x1920')
                .aspect('9:16')
                .autopad(true, 'black')
                .videoCodec('libx264')
                .on('end', () => {
                console.log('file has been converted successfully');
                resolve('');
            })
                .on('error', (err) => {
                console.log(`an error happened: ${err.message}`);
                reject(`an error happened: ${err.message}`);
            })
                .run();
        });
        console.log('end convert');
        dto.embed_link = UploadFolder + '/converted/' + video.originalname;
        return this.videoService.createVideo(video, dto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createMusic'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, create_music_dto_1.CreateMusicDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createMusic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createComment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createComment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('recomendation'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "videosRecom", null);
__decorate([
    (0, common_1.Get)('follows'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFollowing", null);
__decorate([
    (0, common_1.Post)('/likeComment'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [likeComment_dto_1.LikeCommentDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "likeComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('videoWatch'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "WatchVideo", null);
__decorate([
    (0, common_1.Post)('createTag'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createTag", null);
__decorate([
    (0, common_1.Post)('updateAvatar'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Patch)('updateProfile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
    }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('likeVideo'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "likeVideo", null);
__decorate([
    (0, common_1.Post)('followChannel'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "followChannel", null);
__decorate([
    (0, common_1.Post)('unfollowChannel'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "unfollowChannel", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('/deleteVideo/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "DeleteVideo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createCommentOnUser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentOnUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserComment", null);
__decorate([
    (0, common_1.Get)('/search/:search'),
    __param(0, (0, common_1.Param)('search', idValidation_pipe_1.IdValidationpipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSearch", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createVideo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'mp4',
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
    }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_video_dto_1.createVideoDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createVideo", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, video_service_1.VideoService, comment_service_1.CommentService, music_service_1.MusicService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map