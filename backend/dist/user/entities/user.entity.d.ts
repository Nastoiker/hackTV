import { Music } from "../../music/entities/music.entity";
import { Like, Video } from "../../video/entities/video.entity";
export declare class User {
    id: string;
    authorUrl: string;
    email: string;
    login: string;
    phone?: string | null;
    hashpassword: string;
    AccessToken: string;
    isActive: boolean;
    Comment: Comment[];
    videos: Video[];
    avatar?: string | null;
    following_count: number;
    music: Music[];
    LikeCount: number;
    Like: Like[];
}
