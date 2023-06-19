import { IsNumber, IsString } from 'class-validator';

export class FindVideoDto {
  @IsString()
  category: string;
  @IsNumber()
  limit: number;
}
