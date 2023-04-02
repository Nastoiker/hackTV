import { ConvertVideoService } from './convert-video.service';
import { CreateConvertVideoDto } from './dto/create-convert-video.dto';
import { UpdateConvertVideoDto } from './dto/update-convert-video.dto';
export declare class ConvertVideoController {
    private readonly convertVideoService;
    constructor(convertVideoService: ConvertVideoService);
    create(createConvertVideoDto: CreateConvertVideoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateConvertVideoDto: UpdateConvertVideoDto): string;
    remove(id: string): string;
}
