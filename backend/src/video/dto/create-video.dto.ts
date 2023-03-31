import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import {SecondLevelCategory} from "../../category/entities/category.entity";
import {Music} from "../../music/entities/music.entity";
import {User} from "../../user/entities/user.entity";
import {Like, TagOnVideo} from "../entities/video.entity";

export class createVideoDto {
	name: string;
	alias: string;
	userId: string ;
	Title: string;
	duration: number = 0;
	embed_link: string = '';
	embed_html: string  = '';
	share_url: string  = '';
	view_count: number = 0;
	share_count: number = 0;
	comment_count: number = 0;
	cover_image_url: string = '';
	Description: string;
	secondCategoryId: string;
	Type: string = '';
	likesCount: number = 0 ;
	width: number;
	height: number;
	musicId: string;
	isActive: boolean = true;
	tagId: string ;
}
