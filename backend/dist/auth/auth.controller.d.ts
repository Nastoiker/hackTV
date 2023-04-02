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
    authByJwt(query: any): Promise<any>;
}
