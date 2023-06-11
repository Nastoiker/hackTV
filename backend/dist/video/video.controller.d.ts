/// <reference types="multer" />
import { VideoModel } from "./video.model";
import { createVideoDto } from "./dto/create-video.dto";
import { VideoService } from "./video-service";
import { VideoReportDto } from "./dto/report-video.dto";
import { UserService } from "../user/user.service";
import { MusicService } from "../music/music.service";
export declare class VideoController {
    private readonly videoService;
    private readonly userService;
    private readonly musicService;
    constructor(videoService: VideoService, userService: UserService, musicService: MusicService);
    create(request: any, video: Express.Multer.File, dto: createVideoDto): Promise<import(".prisma/client").Video>;
    getSearch(search: string): Promise<import(".prisma/client").Video[]>;
    get(id: string): Promise<import(".prisma/client").Video>;
    getTags(): Promise<import(".prisma/client").Tag[]>;
    FoundValue(search: string): Promise<{
        channels: import(".prisma/client").UserModel[];
        videos: import(".prisma/client").Video[];
        tags: (import(".prisma/client").Video & {
            Comment: import(".prisma/client").Comment[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: import(".prisma/client").UserModel & {
                folowers: import(".prisma/client").Folower[];
            };
            secondCategory: import(".prisma/client").SecondLevelCategory;
            likes: import(".prisma/client").Like[];
            watchers: import(".prisma/client").HistoryWatching[];
        })[];
        musics: import(".prisma/client").Music[];
    }>;
    getByCategoryAlias(alias: string): Promise<any[] | (import(".prisma/client").SecondLevelCategory & {
        videos: (import(".prisma/client").Video & {
            Comment: import(".prisma/client").Comment[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: import(".prisma/client").UserModel & {
                folowers: import(".prisma/client").Folower[];
            };
            secondCategory: import(".prisma/client").SecondLevelCategory;
            likes: import(".prisma/client").Like[];
            watchers: import(".prisma/client").HistoryWatching[];
        })[];
    })>;
    WatchVideo(request: any, { videoId }: {
        videoId: string;
    }): Promise<import(".prisma/client").HistoryWatching>;
    videos(): Promise<import(".prisma/client").Video[]>;
    getById(id: string): Promise<import(".prisma/client").Video>;
    delete(id: string): Promise<void>;
    patch(id: string, dto: VideoModel): Promise<import(".prisma/client").Video>;
    getByTag(id: string, dto: VideoModel): Promise<(import(".prisma/client").Video & {
        Comment: import(".prisma/client").Comment[];
        music: import(".prisma/client").Music;
        tag: (import(".prisma/client").TagOnVideo & {
            tag: import(".prisma/client").Tag;
        })[];
        authorVideo: import(".prisma/client").UserModel & {
            folowers: import(".prisma/client").Folower[];
        };
        secondCategory: import(".prisma/client").SecondLevelCategory;
        likes: import(".prisma/client").Like[];
        watchers: import(".prisma/client").HistoryWatching[];
    })[]>;
    reportOnVideo(dto: VideoReportDto): Promise<import(".prisma/client").ReportOnVideo>;
    getCommentsVideo(id: string): Promise<import(".prisma/client").Comment[]>;
}
