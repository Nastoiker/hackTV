
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
    Post, Req, UploadedFile,
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
import {unlink, writeFile} from "fs-extra";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {Music} from "../music/entities/music.entity";
import {MusicService} from "../music/music.service";



@Controller('Video')
export class VideoController {
    constructor(private readonly videoService: VideoService, private readonly userService: UserService, private readonly  musicService: MusicService) {}
    // @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('files'))
    async create(@Req() request, @UploadedFile(
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
        console.log(dto);
        dto.userId = request.user.id;
        const inputPath = video.path;
        const outputPath = `${inputPath}.mp4`;
        const UploadFolder = `${path}/uploads/videos`;
        await writeFile(`${UploadFolder}/${video.originalname}`, video.buffer);
        const videopath = `${UploadFolder}/${video.originalname}`
        // возвращаем URL конвертированного файла
        return this.videoService.createVideo(video, dto, videopath);
    }
    @Get('/search/:search')
    async getSearch(@Param(':search', IdValidationpipe) search: string) {

        const product = await this.videoService.getSearch(search);
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationpipe) id: string) {
        const product = await this.videoService.video({id});
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }

    @Get('tag/tags')
    async getTags() {
        const tags = await this.videoService.tags({});
        if (!tags) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return tags;
    }
    @Get('/found/:search')
    async FoundValue(@Param('search') search: string) {
        const searchValue = search.slice(1, search.length);
        const videos = await this.videoService.getSearch(searchValue);
        const channels = await this.userService.foundUser(searchValue);
        const tags = await this.videoService.GetSearchTags(searchValue);
        const musics = await this.musicService.foundMusic(searchValue)
        const res = {channels: channels, videos: videos, tags: tags, musics: musics};
        return res;
    }
    @Get('/category/:alias')
    async getByCategoryAlias(@Param('alias') alias: string) {
        const aliasValue = alias.slice(1, alias.length);
        const videos = await this.videoService.videosByCategory({ where: { name: aliasValue}});
        if (!videos) {
            return [];
        }
        return videos;
    }
    @Post('videoWatch')
    async WatchVideo(@Req() request,@Body() {videoId}: {videoId: string} ) {
        const user = request.user?.id
        const product = await this.videoService.watchVideo(user, videoId);
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }

        return product;
    }

    @Get('')
    async videos() {
        const product = await this.videoService.videos( {});
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }
    @Get(':TagId')
    async getById(@Param('TagId', IdValidationpipe) id: string) {
        const product = await this.videoService.video({id});
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationpipe) id: string) {
        const deletedProduct = await this.videoService.deleteVideo(id);
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
    @Get('tagVideo/:tagId')
    async getByTag(@Param('tagId', IdValidationpipe) id: string, @Body() dto: VideoModel) {
        const tag = id.slice(1, id.length);
        const UpdatedProduct = await this.videoService.getVideoByTag(tag);
        if(!UpdatedProduct) return [];
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
    @Get('/comments/:videoId')
    async getCommentsVideo(@Param('videoId', IdValidationpipe) id: string) {
        const videoId = id.slice(1, id.length);
        const product = await this.videoService.commentsVideo(videoId);
        if (!product) {
            throw new NotFoundException(VideoByIdNotFount);
        }
        return product;
    }
    // @UsePipes(new ValidationPipe())
    // @HttpCode(200)
    // @Post('find')
    // async find(@Body() dto: FindVideoDto) {
    //     return this.videoService.video(dto);
    // }
}
