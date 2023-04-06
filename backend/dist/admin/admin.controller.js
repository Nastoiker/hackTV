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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const admin_guard_1 = require("../auth/guards/admin.guard");
const create_report_dto_1 = require("./dto/create-report.dto");
const user_service_1 = require("../user/user.service");
const create_category_dto_1 = require("../category/dto/create-category.dto");
const category_service_1 = require("../category/category.service");
let AdminController = class AdminController {
    constructor(adminService, userService, categoryService) {
        this.adminService = adminService;
        this.userService = userService;
        this.categoryService = categoryService;
    }
    createAdmin({ id }) {
        return this.adminService.createAdmin(id);
    }
    videoWithReport({ id }) {
        return this.adminService.createAdmin(id);
    }
    createReport(dto) {
        return this.adminService.createReport(dto);
    }
    getAllUsers() {
        return this.userService.users({});
    }
    banAdmin({ id }) {
        return this.adminService.removeAdminAbility(id);
    }
    unBanUser({ id }) {
        return this.adminService.removeAdminAbility(id);
    }
    removeAdminAbility({ id }) {
        return this.adminService.removeAdminAbility(id);
    }
    findOne(id) {
        return this.adminService.findOne(+id);
    }
    babOneUser(id) {
        return this.adminService.banOne(id);
    }
    update(id, updateAdminDto) {
        return this.adminService.update(+id, updateAdminDto);
    }
    createFirstCategory(query, createFirstCategory) {
        return this.categoryService.createFirstCategory(createFirstCategory);
    }
    createSecondCategory(createSecondCategory) {
        return this.categoryService.createSecondCategory(createSecondCategory);
    }
    deleteFirstCategory(id) {
        return this.categoryService.deleteFirstCategory(id);
    }
    deleteSecondCategory(id) {
        return this.categoryService.deleteFirstCategory(id);
    }
    removeVideo(id) {
        return this.adminService.removeVideo(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('addAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('addAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "videoWithReport", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('createReport'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createReport", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Get)('createReport'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('banAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "banAdmin", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('banAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "unBanUser", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('removeAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeAdminAbility", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('banUser:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "babOneUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('createFirstCategory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.createFirstCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createFirstCategory", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Post)('createSecondCategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.createSecondCategoryDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createSecondCategory", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminJwtAuthGuard),
    (0, common_1.Delete)('deleteFirstCategory:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteFirstCategory", null);
__decorate([
    (0, common_1.Delete)('deleteSecondCategory:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteSecondCategory", null);
__decorate([
    (0, common_1.Delete)('Video:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeVideo", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, user_service_1.UserService, category_service_1.CategoryService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map