import {User} from "../../user/entities/user.entity";
import {IsString, ValidateNested} from "class-validator";
import {Video} from "../../video/entities/video.entity";

export class CreateMusicDto {

    @IsString({ message: 'Название должно быть строкой' })
    name: string;

    @ValidateNested({ message: 'Пользователь должен быть объектом' })
    user: User;
    @IsString({ message: 'ID пользователя должен быть строкой' })
    userId: string;
    @IsString({ message: 'Алиас должен быть строкой' })
    alias: string;
    @ValidateNested({ each: true, message: 'Видео должно быть объектом' })
    videos: Video[];
}
