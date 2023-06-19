import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SecondLevelCategory } from '../../category/entities/category.entity';
import { Music } from '../../music/entities/music.entity';
import { User } from '../../user/entities/user.entity';
import { Like, TagOnVideo } from '../entities/video.entity';

export class createVideoDto {
  name: string;
  alias: string;
  userId: string;
  Title: string;
  duration = 0;
  embed_link = '';
  embed_html = '';
  share_url = '';
  view_count = 0;
  share_count = 0;
  comment_count = 0;
  cover_image_url = '';
  Description: string;
  secondCategoryId: string;
  Type = '';
  likesCount = 0;
  width: number;
  height: number;
  musicId: string;
  isActive = true;
  tagId: string;
}
