
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationpipe } from 'src/pipes/idValidation.pipe';
import * as ffmpeg from 'fluent-ffmpeg';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus,
    NotFoundException,
    Param, ParseFilePipeBuilder,
    Patch,
    Post, UploadedFile,
    UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {VideoByIdNotFount, VideoIdNotFoundForUpd} from "./video.constants";
import {FindVideoDto} from "./dto/find-video.dto";
import {VideoModel} from "./video.model";
import {createVideoDto} from "./dto/create-video.dto";
import {VideoService} from "./video-service";
import {VideoReportDto} from "./dto/report-video.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {path} from "app-root-path";
import {writeFile} from "fs-extra";



@Controller('Video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    // @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('files'))
    async create(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'mp4',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) video: Express.Multer.File, @Body() dto: createVideoDto) {
        if (!video) {
            throw new BadRequestException('Please upload a video file.');
        }
        if (video.mimetype !== 'video/mp4') {
            throw new BadRequestException('Only MP4 videos are allowed.');
        }
        const inputPath = video.path;
        const outputPath = `${inputPath}.mp4`;
        const UploadFolder = `${path}/uploads/videos`;
        await writeFile(`${UploadFolder}/${video.originalname}`, video.buffer);
        const videopath = `${UploadFolder}/${video.originalname}`

        await new Promise((resolve, reject) => {
              ffmpeg(videopath)
                .output(outputPath)
                .videoCodec('libx264')
                .audioCodec('copy')
                  .size('1080x1920')
                  .audioBitrate('128k')
                  .audioChannels(2)
                .outputOptions(['-preset ultrafast'])
                .on('end', () => {
                    console.log('file has been converted successfully');
                    resolve('');
                })
                .on('error', (err) => {
                    console.log(`an error happened: ${err.message}`);
                    reject(`an error happened: ${err.message}`);
                })
                .run();
        });

        // возвращаем URL конвертированного файла
        // return this.videoService.createVideo(video, dto);
        return UploadFolder;
    }

    @Get(':id')
    async get(@Param('id', IdValidationpipe) id: string) {
        const product = await this.videoService.video({id});
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationpipe) id: string) {
        const deletedProduct = await this.videoService.deleteVideo({id});
        if (!deletedProduct) {
            throw new NotFoundException(VideoByIdNotFount);
        }
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationpipe) id: string, @Body() dto: VideoModel) {
        const UpdatedProduct = await this.videoService.updateVideo({ where: {id}, data: dto });
        if (!UpdatedProduct) {
            throw new NotFoundException(VideoIdNotFoundForUpd);
        }
        return UpdatedProduct;
    }
    @UseGuards(JwtAuthGuard)
    @Post('ReportOnVideo')
    async reportOnVideo(@Body() dto: VideoReportDto) {
        const reportVideo = await this.videoService.reportVideo(dto)
        if (!reportVideo) {
            throw new NotFoundException(VideoIdNotFoundForUpd);
        }
        return reportVideo;
    }
    // @UsePipes(new ValidationPipe())
    // @HttpCode(200)
    // @Post('find')
    // async find(@Body() dto: FindVideoDto) {
    //     return this.videoService.video(dto);
    // }
}
