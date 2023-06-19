import { IsString, ValidateNested } from 'class-validator';
import { Video } from '../../video/entities/video.entity';

export class FirstLevelCategory {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  alias: string;

  @ValidateNested({ each: true })
  secondLevelCategory: SecondLevelCategory[];
}

export class SecondLevelCategory {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  alias: string;

  @ValidateNested()
  firstLevelCategory: FirstLevelCategory;

  @IsString()
  firstLevelId: string;

  @ValidateNested({ each: true })
  videos: Video[];
}
