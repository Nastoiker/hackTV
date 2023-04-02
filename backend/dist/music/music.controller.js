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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const create_music_dto_1 = require("./dto/create-music.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    create(query, music, createMusicDto) {
        console.log('user' + query.user);
        createMusicDto.userId = query.user.id;
        return this.musicService.create(music, createMusicDto);
    }
    findAll() {
        return this.musicService.findAll();
    }
    findOne(id) {
        return this.musicService.findOne(id);
    }
    remove(id) {
        return this.musicService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('music')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_music_dto_1.CreateMusicDto]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "remove", null);
MusicController = __decorate([
    (0, common_1.Controller)('music'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
exports.MusicController = MusicController;
//# sourceMappingURL=music.controller.js.map