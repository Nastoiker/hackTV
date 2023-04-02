import { UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "../prisma/prisma-service";
import { CreateUserDto } from "../user/dto/create-user.dto";
export declare class AuthService {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(dto: CreateUserDto): Promise<UserModel>;
    findUser(email: string): Promise<UserModel | null>;
    validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>>;
    login(email: string): Promise<{
        accesToken: string;
    }>;
}
