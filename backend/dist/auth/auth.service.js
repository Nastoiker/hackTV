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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const auth_constants_1 = require("./auth.constants");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma-service");
const fs = require("fs");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createUser(dto) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const password = dto.hashpassword;
        dto.hashpassword = await (0, bcryptjs_1.hash)(password, salt);
        const user = await this.prisma.userModel.create({ data: Object.assign({}, dto) });
        fs.mkdirSync('uploads/users/' + user.id);
        fs.mkdirSync('uploads/users/' + user.id + '/video');
        fs.mkdirSync('uploads/users/' + user.id + '/music');
        fs.mkdirSync('uploads/users/' + user.id + '/avatar');
        return user;
    }
    async findUser(email) {
        return this.prisma.userModel.findFirst({ where: { email } });
    }
    async validateUser(email, password) {
        const User = await this.findUser(email);
        if (!User) {
            throw new common_1.UnauthorizedException(auth_constants_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectUser = await (0, bcryptjs_1.compare)(password, User.hashpassword);
        if (!isCorrectUser) {
            throw new common_1.UnauthorizedException(auth_constants_1.WRONG_PASSWORD_ERROR);
        }
        return { email: User.email };
    }
    async authByJwt(id) {
        return this.prisma.userModel.findUnique({
            where: { id },
            include: { Like: true, videos: { include: { music: true,
                        tag: { include: { tag: true } },
                        authorVideo: true,
                        secondCategory: true,
                        Comment: { include: { writtenBy: true, userComments: { include: { user: true } } } } } }, folowing: true, folowers: true, userComment: true, music: true }
        });
    }
    async login(email) {
        const payLoad = { email, role: 'user' };
        return {
            accesToken: await this.jwtService.signAsync(payLoad),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map