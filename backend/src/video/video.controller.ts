
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationpipe } from 'src/pipes/idValidation.pipe';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
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
    async create(@Body() dto: createVideoDto) {
        return this.videoService.createVideo(dto);
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
