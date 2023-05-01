import { MusicService } from './music.service';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    findAll(): Promise<(import(".prisma/client").Music & {
        videos: import(".prisma/client").Video[];
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MusicClient<import(".prisma/client").Music, never>;
    remove(id: string): Promise<import(".prisma/client").Music>;
}
