import {IsBoolean, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Music} from "../../music/entities/music.entity";
import {Like, Video} from "../../video/entities/video.entity";

export class User {
    @IsString()
    id: string;

    @IsString()
    authorUrl: string;

    @IsString()
    email: string;

    @IsString()
    login: string;

    @IsOptional()
    @IsString()
    phone?: string | null;

    @IsString()
    hashpassword: string;

    @IsString()
    AccessToken: string;

    @IsBoolean()
    isActive: boolean;

    @ValidateNested({ each: true })
    Comment: Comment[];

    @ValidateNested({ each: true })
    videos: Video[];

    @IsOptional()
    @IsString()
    avatar?: string | null;

    @IsNumber()
    following_count: number;

    @ValidateNested({ each: true })
    music: Music[];

    @IsNumber()
    LikeCount: number;

    @ValidateNested({ each: true })
    Like: Like[];
}
