import { User } from "../../user/entities/user.entity";
import { Music } from "../../music/entities/music.entity";
import { SecondLevelCategory } from "../../category/entities/category.entity";
export declare class Video {
    name: string;
    alias: string;
    isActive: boolean;
    updated_at: Date;
    createdAt: Date;
    id: string;
    secondCategory: SecondLevelCategory;
    secondCategoryId: string;
    tag: TagOnVideo[];
    tagId: string;
    Title: string;
    duration: string;
    embed_link: string;
    embed_html: string;
    share_url: string;
    cover_image_url: string;
    Description: string;
    Type: string;
    width: number;
    height: number;
    musicId: string;
    music: Music;
    share_count: number;
    view_count: number;
    comment_count: number;
    likesCount: number;
    likes: Like[];
    user: User;
    userId: string;
    ReportOnVideo: ReportOnVideo[];
}
export declare class ReportOnVideo {
    id: string;
    text: string;
    user: User;
    video: Video;
}
export declare class TagOnVideo {
    video: Video;
    videoId: string;
    tag: Tag;
    tagId: string;
}
export declare class Tag {
    id: string;
    name: string;
}
export declare class Like {
    id: string;
    user: User;
    video: Video;
}
