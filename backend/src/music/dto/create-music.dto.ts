import { User } from '../../user/entities/user.entity';
import { IsString, ValidateNested } from 'class-validator';
import { Video } from '../../video/entities/video.entity';

export class CreateMusicDto {
  @IsString({ message: 'Название должно быть строкой' })
  name: string;
  @IsString({ message: 'ID пользователя должен быть строкой' })
  userId = '';
  @IsString({ message: 'Алиас должен быть строкой' })
  alias: string;
  @IsString()
  img = '';
  music_url = '';
}
