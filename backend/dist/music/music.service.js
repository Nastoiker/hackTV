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
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma-service");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
let MusicService = class MusicService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(file, img, createMusicDto) {
        const uploadFolder = 'uploads/users/' + createMusicDto.userId;
        const extensionImg = img.originalname.split('.');
        createMusicDto.img = uploadFolder + '/music/' + createMusicDto.alias + '.' + extensionImg[extensionImg.length - 1];
        const extension = file.originalname.split('.');
        await (0, fs_extra_1.writeFile)(uploadFolder + '/music/' + createMusicDto.alias + '.' + extensionImg[extensionImg.length - 1], img.buffer);
        createMusicDto.music_url = uploadFolder + '/music/' + createMusicDto.alias + '.' + extension[extension.length - 1];
        await (0, fs_extra_1.writeFile)(uploadFolder + '/music/' + createMusicDto.alias + '.' + extension[extension.length - 1], file.buffer);
        return this.prismaService.music.create({
            data: createMusicDto
        });
    }
    async findAll() {
        return this.prismaService.music.findMany({
            where: {},
            include: {
                videos: true,
            },
        });
    }
    findOne(id) {
        return this.prismaService.music.findFirst({
            where: { id }
        });
    }
    update(id, updateMusicDto) {
        return `This action updates a #${id} music`;
    }
    async remove(id) {
        const remove = await this.prismaService.music.findFirst({
            where: { id },
            select: { music_url: true },
        });
        (0, fs_extra_1.unlink)(app_root_path_1.path + '/' + remove.music_url);
        return this.prismaService.music.delete({
            where: { id },
        });
        ;
    }
};
MusicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MusicService);
exports.MusicService = MusicService;
//# sourceMappingURL=music.service.js.map