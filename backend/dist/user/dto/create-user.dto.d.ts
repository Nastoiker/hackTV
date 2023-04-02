export declare class CreateUserDto {
    authorUrl: string;
    email: string;
    login: string;
    role: 'user' | 'admin';
    isActive: boolean;
    following_count: number;
    phone?: string | null;
    hashpassword: string;
    LikeCount: number;
    avatar?: string | null;
}
