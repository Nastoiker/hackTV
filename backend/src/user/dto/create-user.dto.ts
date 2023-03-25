import {IsBoolean, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
export class CreateUserDto {
    @IsString({ message: 'URL автора должен быть строкой' })
    authorUrl: string;

    @IsString({ message: 'Email должен быть строкой' })
    email: string;

    @IsString({ message: 'Логин должен быть строкой' })
    login: string;
    isActive: boolean;
    following_count: number;
    @IsOptional()
    @IsString({ message: 'Номер телефона должен быть строкой' })
    phone?: string | null;

    @IsString({ message: 'Хэш пароля должен быть строкой' })
    hashpassword: string;
    LikeCount: number;
    @IsOptional()
    @IsString({ message: 'URL аватара должен быть строкой' })
    avatar?: string | null;


}
