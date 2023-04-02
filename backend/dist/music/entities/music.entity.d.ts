import { User } from "../../user/entities/user.entity";
import { Video } from "../../video/entities/video.entity";
export declare class Music {
    id: string;
    name: string;
    user: User;
    userId: string;
    alias: string;
    videos: Video[];
}
