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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma-service");
let CommentService = class CommentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createCommentDto(createCommentDto) {
        const { comment, writtenById, videoId, pictures } = createCommentDto;
        return this.prismaService.comment.create({
            data: { comment, writtenById, videoId, pictures }
        });
    }
    async createCommentOnUserDto(createCommentOnUserDto) {
        const { comment, userId, parentId } = createCommentOnUserDto;
        return this.prismaService.userCommentOnComment.create({
            data: { comment, userId, parentId }
        });
    }
    findAll() {
        return `This action returns all comment`;
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map