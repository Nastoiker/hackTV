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
        Comment: import(".prisma/client").Comment[];
        userComment: import(".prisma/client").UserCommentOnComment[];
        videos: import(".prisma/client").Video[];
        music: import(".prisma/client").Music[];
        folowing: import(".prisma/client").Folower[];
        folowers: import(".prisma/client").Folower[];
        Like: import(".prisma/client").Like[];
    }>;
}
