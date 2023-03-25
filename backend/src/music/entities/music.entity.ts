import {IsString, ValidateNested} from "class-validator";
import {User} from "../../user/entities/user.entity";
import {Video} from "../../video/entities/video.entity";

export class Music {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @ValidateNested()
    user: User;

    @IsString()
    userId: string;

    @IsString()
    alias: string;

    @ValidateNested({ each: true })
    videos: Video[];
}
