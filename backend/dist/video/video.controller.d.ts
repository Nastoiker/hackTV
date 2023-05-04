/// <reference types="multer" />
import { VideoModel } from "./video.model";
import { createVideoDto } from "./dto/create-video.dto";
import { VideoService } from "./video-service";
import { VideoReportDto } from "./dto/report-video.dto";
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    create(request: any, video: Express.Multer.File, dto: createVideoDto): Promise<import(".prisma/client").Video>;
    getSearch(search: string): Promise<import(".prisma/client").Video[]>;
    get(id: string): Promise<import(".prisma/client").Video>;
    getTags(): Promise<import(".prisma/client").Tag[]>;
    getByCategoryAlias(alias: string): Promise<import(".prisma/client").SecondLevelCategory & {
        videos: (import(".prisma/client").Video & {
            Comment: (import(".prisma/client").Comment & {
                writtenBy: import(".prisma/client").UserModel;
                userComments: (import(".prisma/client").UserCommentOnComment & {
                    user: import(".prisma/client").UserModel;
                })[];
            })[];
            music: import(".prisma/client").Music;
            tag: (import(".prisma/client").TagOnVideo & {
                tag: import(".prisma/client").Tag;
            })[];
            authorVideo: import(".prisma/client").UserModel;
            secondCategory: import(".prisma/client").SecondLevelCategory;
            likes: import(".prisma/client").Like[];
            watchers: import(".prisma/client").HistoryWatching[];
        })[];
    }>;
    WatchVideo(request: any, { videoId }: {
        videoId: string;
    }): Promise<import(".prisma/client").HistoryWatching>;
    videos(): Promise<import(".prisma/client").Video[]>;
    getById(id: string): Promise<import(".prisma/client").Video>;
    delete(id: string): Promise<void>;
    patch(id: string, dto: VideoModel): Promise<import(".prisma/client").Video>;
    reportOnVideo(dto: VideoReportDto): Promise<import(".prisma/client").ReportOnVideo>;
}
