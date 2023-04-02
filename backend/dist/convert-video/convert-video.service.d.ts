import { CreateConvertVideoDto } from './dto/create-convert-video.dto';
import { UpdateConvertVideoDto } from './dto/update-convert-video.dto';
export declare class ConvertVideoService {
    create(createConvertVideoDto: CreateConvertVideoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateConvertVideoDto: UpdateConvertVideoDto): string;
    remove(id: number): string;
}
