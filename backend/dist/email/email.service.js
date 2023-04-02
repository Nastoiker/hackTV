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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const email_constants_1 = require("./email.constants");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async create(createEmailDto) {
        return 'This action adds a new email';
    }
    async sendEmailIsExist(user, token) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            text: email_constants_1.EMAILWELCOMEMESSAGE,
            html: `<code>${token}</code>`,
            context: {
                name: user.login,
            },
        });
    }
    findAll() {
        return `This action returns all email`;
    }
    findOne(id) {
        return `This action returns a #${id} email`;
    }
    update(id, updateEmailDto) {
        return `This action updates a #${id} email`;
    }
    remove(id) {
        return `This action removes a #${id} email`;
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map