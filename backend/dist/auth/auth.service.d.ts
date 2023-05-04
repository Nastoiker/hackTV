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
                writtenBy: UserModel;
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: UserModel;
                })[];
            })[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
            watchers: import(".prisma/client").HistoryWatching[];
        })[];
        music: (import(".prisma/client").Music & {
            user: UserModel;
            videos: import(".prisma/client").Video[];
        })[];
        Like: (import(".prisma/client").Like & {
            videos: import(".prisma/client").Video & {
                Comment: (import(".prisma/client").Comment & {
                    writtenBy: UserModel;
                    userComments: (import(".prisma/client").UserCommentOnComment & {
                        user: UserModel;
                    })[];
                })[];
                music: import(".prisma/client").Music;
                tag: (import(".prisma/client").TagOnVideo & {
                    tag: import(".prisma/client").Tag;
                })[];
                authorVideo: UserModel;
                secondCategory: import(".prisma/client").SecondLevelCategory;
                watchers: import(".prisma/client").HistoryWatching[];
            };
        })[];
        userComment: import(".prisma/client").UserCommentOnComment[];
        folowing: import(".prisma/client").Folower[];
        folowers: import(".prisma/client").Folower[];
        watching: import(".prisma/client").HistoryWatching[];
    }>;
    login(email: string): Promise<{
        accesToken: string;
    }>;
}
