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
	duration: string;
	embed_link: string;
	embed_html: string;
	share_url: string;
	view_count: number
	share_count: number;
	comment_count: number;
	cover_image_url: string;
	Description: string;
	secondCategoryId: string;
	Type: string;
	width: string
	height: string;
	musicId: string;
	isActive: true;
	tagId: string[];
}
