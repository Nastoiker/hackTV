"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const prisma_service_1 = require("../prisma/prisma-service");
const serve_static_1 = require("@nestjs/serve-static");
const app_root_path_1 = require("app-root-path");
const video_service_1 = require("../video/video-service");
const comment_service_1 = require("../comment/comment.service");
const music_service_1 = require("../music/music.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}`,
                serveRoot: '/user',
            }),],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, prisma_service_1.PrismaService, video_service_1.VideoService, comment_service_1.CommentService, music_service_1.MusicService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map