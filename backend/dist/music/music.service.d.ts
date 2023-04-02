/// <reference types="multer" />
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PrismaService } from "../prisma/prisma-service";
export declare class MusicService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(file: Express.Multer.File, createMusicDto: CreateMusicDto): Promise<import(".prisma/client").Music>;
    findAll(): Promise<import(".prisma/client").Music[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MusicClient<import(".prisma/client").Music, never>;
    update(id: number, updateMusicDto: UpdateMusicDto): string;
    remove(id: string): Promise<import(".prisma/client").Music>;
}
