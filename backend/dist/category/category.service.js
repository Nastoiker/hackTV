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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma-service");
let CategoryService = class CategoryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async categories() {
        return this.prismaService.firstLevelCategory.findMany({ where: {}, include: {
                secondLevelCategory: true
            } });
    }
    async createFirstCategory(firstLevelCategory) {
        return this.prismaService.firstLevelCategory.create({
            data: firstLevelCategory
        });
    }
    async deleteSecondCategory(id) {
        return this.prismaService.secondLevelCategory.delete({
            where: {
                id
            }
        });
    }
    async deleteFirstCategory(id) {
        return this.prismaService.firstLevelCategory.delete({
            where: {
                id
            }
        });
    }
    async createSecondCategory(createSecondCategory) {
        return this.prismaService.secondLevelCategory.create({
            data: createSecondCategory
        });
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map