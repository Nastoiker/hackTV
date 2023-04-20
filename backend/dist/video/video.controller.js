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
exports.VideoController = void 0;
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const idValidation_pipe_1 = require("../pipes/idValidation.pipe");
const ffmpeg = require("fluent-ffmpeg");
const common_1 = require("@nestjs/common");
const video_constants_1 = require("./video.constants");
const video_model_1 = require("./video.model");
const create_video_dto_1 = require("./dto/create-video.dto");
const video_service_1 = require("./video-service");
const report_video_dto_1 = require("./dto/report-video.dto");
const platform_express_1 = require("@nestjs/platform-express");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async create(request, video, dto) {
        if (!video) {
            throw new common_1.BadRequestException('Please upload a video file.');
        }
        if (video.mimetype !== 'video/mp4') {
            throw new common_1.BadRequestException('Only MP4 videos are allowed.');
        }
        dto.userId = request.user.id;
        const inputPath = video.path;
        const outputPath = `${inputPath}.mp4`;
        const UploadFolder = `${app_root_path_1.path}/uploads/videos`;
        await (0, fs_extra_1.writeFile)(`${UploadFolder}/${video.originalname}`, video.buffer);
        const videopath = `${UploadFolder}/${video.originalname}`;
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
        dto.embed_link = UploadFolder + '/converted/' + video.originalname;
        return this.videoService.createVideo(video, dto);
    }
    async get(id) {
        const product = await this.videoService.video({ id });
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    async getTags() {
        const tags = await this.videoService.tags({});
        if (!tags) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return tags;
    }
    async getByCategoryAlias(alias) {
        const aliasCategory = alias.slice(1, alias.length);
        const videos = await this.videoService.videosByCategory({ where: { name: aliasCategory } });
        if (!videos) {
            throw new common_1.NotFoundException('VideoByIdNotFount');
        }
        return videos;
    }
    async videos() {
        const product = await this.videoService.videos({});
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    async getById(id) {
        const product = await this.videoService.video({ id });
        if (!product) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
        return product;
    }
    async delete(id) {
        const deletedProduct = await this.videoService.deleteVideo(id);
        if (!deletedProduct) {
            throw new common_1.NotFoundException(video_constants_1.VideoByIdNotFount);
        }
    }
    async patch(id, dto) {
        const UpdatedProduct = await this.videoService.updateVideo({ where: { id }, data: dto });
        if (!UpdatedProduct) {
            throw new common_1.NotFoundException(video_constants_1.VideoIdNotFoundForUpd);
        }
        return UpdatedProduct;
    }
    async reportOnVideo(dto) {
        const reportVideo = await this.videoService.reportVideo(dto);
        if (!reportVideo) {
            throw new common_1.NotFoundException(video_constants_1.VideoIdNotFoundForUpd);
        }
        return reportVideo;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
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
], VideoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', idValidation_pipe_1.IdValidationpipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('tag/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)('/category/:alias'),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getByCategoryAlias", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "videos", null);
__decorate([
    (0, common_1.Get)(':TagId'),
    __param(0, (0, common_1.Param)('TagId', idValidation_pipe_1.IdValidationpipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', idValidation_pipe_1.IdValidationpipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', idValidation_pipe_1.IdValidationpipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, video_model_1.VideoModel]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "patch", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('ReportOnVideo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_video_dto_1.VideoReportDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "reportOnVideo", null);
VideoController = __decorate([
    (0, common_1.Controller)('Video'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=video.controller.js.map