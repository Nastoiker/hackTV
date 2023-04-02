import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UserModel } from "@prisma/client";
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    create(createEmailDto: CreateEmailDto): Promise<string>;
    sendEmailIsExist(user: UserModel, token: string): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmailDto: UpdateEmailDto): string;
    remove(id: number): string;
}
