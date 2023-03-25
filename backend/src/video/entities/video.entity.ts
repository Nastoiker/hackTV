import {User} from "../../user/entities/user.entity";

import {IsNumber, IsString, ValidateNested} from 'class-validator';
import {Music} from "../../music/entities/music.entity";
import {SecondLevelCategory} from "../../category/entities/category.entity";

export class Video {
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
export class ReportOnVideo {
    id: string;
    text: string;
    user: User;
    video: Video;
}
export class TagOnVideo {
    @ValidateNested()
    video: Video;

    @IsString()
    videoId: string;

    @ValidateNested()
    tag: Tag;

    @IsString()
    tagId: string;
}
export class Tag {
    @IsString()
    id: string;

    @IsString()
    name: string;
}
export class Like {
    id: string;
    user: User;
    video: Video;
}