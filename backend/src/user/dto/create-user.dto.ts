import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'URL автора должен быть строкой' })
  authorUrl: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Логин должен быть строкой' })
  login: string;
  @IsString({ message: 'Роль должна быть строкой' })
  role: 'user' | 'admin';
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
