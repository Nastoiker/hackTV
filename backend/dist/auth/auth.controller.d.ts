import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from "../user/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    userService: any;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<import(".prisma/client").UserModel>;
    login({ email, password }: AuthDto): Promise<{
        accesToken: string;
    }>;
    authByJwt(query: any): Promise<import(".prisma/client").UserModel & {
        videos: (import(".prisma/client").Video & {
            Comment: (import(".prisma/client").Comment & {
                writtenBy: import(".prisma/client").UserModel;
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: import(".prisma/client").UserModel;
                })[];
            })[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: import(".prisma/client").UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
        })[];
        music: import(".prisma/client").Music[];
        Like: (import(".prisma/client").Like & {
            videos: import(".prisma/client").Video & {
                Comment: (import(".prisma/client").Comment & {
                    writtenBy: import(".prisma/client").UserModel;
                    userComments: (import(".prisma/client").UserCommentOnComment & {
                        user: import(".prisma/client").UserModel;
                    })[];
                })[];
                music: import(".prisma/client").Music;
                tag: (import(".prisma/client").TagOnVideo & {
                    tag: import(".prisma/client").Tag;
                })[];
                authorVideo: import(".prisma/client").UserModel;
                secondCategory: import(".prisma/client").SecondLevelCategory;
            };
        })[];
        folowers: import(".prisma/client").Folower[];
        folowing: import(".prisma/client").Folower[];
        userComment: import(".prisma/client").UserCommentOnComment[];
    }>;
}
