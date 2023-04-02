/// <reference types="multer" />
import { VideoModel } from "./video.model";
import { createVideoDto } from "./dto/create-video.dto";
import { VideoService } from "./video-service";
import { VideoReportDto } from "./dto/report-video.dto";
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    create(request: any, video: Express.Multer.File, dto: createVideoDto): Promise<import(".prisma/client").Video>;
    get(id: string): Promise<import(".prisma/client").Video>;
    videos(): Promise<import(".prisma/client").Video[]>;
    getById(id: string): Promise<import(".prisma/client").Video>;
    delete(id: string): Promise<void>;
    patch(id: string, dto: VideoModel): Promise<import(".prisma/client").Video>;
    reportOnVideo(dto: VideoReportDto): Promise<import(".prisma/client").ReportOnVideo>;
}
