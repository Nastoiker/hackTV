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
    authByJwt(id: string): Promise<UserModel & {
        videos: (import(".prisma/client").Video & {
            Comment: (import(".prisma/client").Comment & {
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: UserModel;
                })[];
                writtenBy: UserModel;
            })[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
        })[];
        music: import(".prisma/client").Music[];
        Like: (import(".prisma/client").Like & {
            videos: import(".prisma/client").Video & {
                Comment: (import(".prisma/client").Comment & {
                    userComments: (import(".prisma/client").UserCommentOnComment & {
                        user: UserModel;
                    })[];
                    writtenBy: UserModel;
                })[];
                music: import(".prisma/client").Music;
                tag: (import(".prisma/client").TagOnVideo & {
                    tag: import(".prisma/client").Tag;
                })[];
                authorVideo: UserModel;
                secondCategory: import(".prisma/client").SecondLevelCategory;
            };
        })[];
        folowers: import(".prisma/client").Folower[];
        folowing: import(".prisma/client").Folower[];
        userComment: import(".prisma/client").UserCommentOnComment[];
    }>;
    login(email: string): Promise<{
        accesToken: string;
    }>;
}
