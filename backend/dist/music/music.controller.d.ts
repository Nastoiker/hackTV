/// <reference types="multer" />
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    create(query: any, music: Express.Multer.File, createMusicDto: CreateMusicDto): Promise<import(".prisma/client").Music>;
    findAll(): Promise<import(".prisma/client").Music[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MusicClient<import(".prisma/client").Music, never>;
    remove(id: string): Promise<import(".prisma/client").Music>;
}
