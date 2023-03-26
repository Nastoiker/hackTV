
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationpipe } from 'src/pipes/idValidation.pipe';
import * as ffmpeg from 'fluent-ffmpeg';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UploadedFile,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {VideoByIdNotFount, VideoIdNotFoundForUpd} from "./video.constants";
import {FindVideoDto} from "./dto/find-video.dto";
import {VideoModel} from "./video.model";
import {createVideoDto} from "./dto/create-video.dto";
import {VideoService} from "./video-service";



@Controller('Video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@UploadedFile() video: Express.Multer.File, @Body() dto: createVideoDto) {
        if (!video) {
            throw new BadRequestException('Please upload a video file.');
        }
        if (video.mimetype !== 'video/mp4') {
            throw new BadRequestException('Only MP4 videos are allowed.');
        }
        const inputPath = video.path;
        const outputPath = `${inputPath}.mp4`;
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .outputOptions('-c:v libx264')
                .outputOptions('-crf 22')
                .outputOptions('-preset veryfast')
                .outputOptions('-c:a copy')
                .output(outputPath)
                .on('end', () => {
                    console.log('Video conversion complete');
                    resolve('');
                })
                .on('error', (err) => {
                    console.log(`Error converting video: ${err.message}`);
                    reject(err);
                })
                .run();
        });

        // возвращаем URL конвертированного файла
        return this.videoService.createVideo(video, dto);
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
    // @UsePipes(new ValidationPipe())
    // @HttpCode(200)
    // @Post('find')
    // async find(@Body() dto: FindVideoDto) {
    //     return this.videoService.video(dto);
    // }
}
