import { UserModel } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from "../../prisma/prisma-service";
declare const JwtStratagy_base: new (...args: any[]) => Strategy;
export declare class JwtStratagy extends JwtStratagy_base {
    private readonly configService;
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(request: Request, { email }: Pick<UserModel, 'email'>): Promise<UserModel>;
}
export {};
