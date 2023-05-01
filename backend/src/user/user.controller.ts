import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus, UseInterceptors, UseGuards, Query, Req, BadRequestException, NotFoundException, UploadedFiles
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AnyFilesInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateCommentDto} from "./dto/createComment-dto";
import {LikeCommentDto} from "./dto/likeComment-dto";
import {VideoService} from "../video/video-service";
import {CreateCommentOnUserDto} from "../comment/dto/create-comment.dto";
import {CommentService} from "../comment/comment.service";
import {IdValidationpipe} from "../pipes/idValidation.pipe";
import {VideoByIdNotFount} from "../video/video.constants";
import {MusicService} from "../music/music.service";
import {CreateMusicDto} from "../music/dto/create-music.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly videoService: VideoService, private  readonly commentService: CommentService, private readonly musicService: MusicService) {}

  // @Post('/createComment')
  // @UseGuards(JwtAuthGuard)
  // createComment(@Body() commentDto: CreateCommentDto) {
  //   return this.userService.createComment(commentDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Post('createMusic')
  @UseInterceptors(
      AnyFilesInterceptor()
  )
  createMusic(@Req() query, @UploadedFiles() files: Array<Express.Multer.File>, @Body() createMusicDto: CreateMusicDto) {
    console.log('user' +  query.user);
    createMusicDto.userId = query.user.id;
    return this.musicService.create(files[0], files[1],createMusicDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createComment')
  createComment(@Req() request, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.writtenById = request.user.id
    return this.commentService.createCommentDto(createCommentDto);
  }
  // @Get('follows:id')
  // async getFollowing(@Param('id') id: string) {
  //
  //   const userId = id.slice(1,id.length);
  //   const folows = await this.userService.getFolows(userId);
  //   if(!folows) {
  //     return new BadRequestException('failed');
  //   }
  //   return folows;
  // }
  @UseGuards(JwtAuthGuard)
  @Get('recomendation')
  async videosRecom(@Req() request ) {
    const user = request.user.id
    const product = await this.videoService.videosRecom(user);
    if (!product) {
      throw new NotFoundException(VideoByIdNotFount);
    }

    return product;
  }

  @Get('follows')
  @UseGuards(JwtAuthGuard)
  async getFollowing(@Req() req) {

    const userId = req.user.id;
    const folows = await this.userService.getFolows(userId);
    if(!folows) {
      return new BadRequestException('failed');
    }
    return folows;
  }
  @Post('/likeComment')
  @UseGuards(JwtAuthGuard)
  likeComment(@Body() likeCommentDto: LikeCommentDto) {
      return this.userService.likeComment(likeCommentDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('videoWatch')
  async WatchVideo(@Req() request, @Body() {videoId}: {videoId: string} ) {
    const user = request.user?.id
    const product = await this.videoService.watchVideo(user, videoId);
    if (!product) {
      throw new NotFoundException(VideoByIdNotFount);
    }

    return product;
  }
  @Post('createTag')
  @UseGuards(JwtAuthGuard)
  createTag(@Body() dto: {name: string}) {
    return this.userService.createTag(dto.name);
  }
  @Post('updateAvatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@Req() query, @UploadedFile(
      new ParseFilePipeBuilder()
          .addMaxSizeValidator({ maxSize: 5242880 })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
          }),
  ) avatar: Express.Multer.File) {
    return this.userService.updateAvatar(query.user, avatar);
  }
  @Patch('updateProfile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(@Req() query, @UploadedFile(
      new ParseFilePipeBuilder()
          .addMaxSizeValidator({ maxSize: 5242880 })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
          }),
  ) avatar: Express.Multer.File, @Body() body: UpdateUserDto) {
    return this.userService.updateProfile(query.user, avatar, body);
  }
  @Get()
  findAll() {
    return this.userService.users({});
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.user({id});
  }
  @Post('likeVideo')
  @UseGuards(JwtAuthGuard)
  likeVideo(@Req() query, @Body() { videoId }: { videoId: string }) {
    const userId = query.user.id;
    return this.userService.like(userId, videoId);
  }

  @Post('followChannel')
  @UseGuards(JwtAuthGuard)
  followChannel(@Req() query, @Body() { authorId }: { authorId: string }) {
    const userId = query.user.id;
    return this.userService.followChannel(userId, authorId);
  }
  @Post('unfollowChannel')
  @UseGuards(JwtAuthGuard)
  unfollowChannel(@Req() query, @Body() { id, authorId }: { id: string, authorId: string }) {
    const userId = query.user.id;
    if(!userId) return;
    return this.userService.unfollowChannel(id, userId, authorId );
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ where: {id}, data: updateUserDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({id});
  }
  @Delete('/deleteVideo/:id')
  @UseGuards(JwtAuthGuard)
  DeleteVideo(@Param('id') id: string) {
    const res = id.slice(1, id.length);
    return this.videoService.deleteVideo(res);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createCommentOnUser')
  createUserComment(@Req() request, @Body() createCommentOnUserDto: CreateCommentOnUserDto) {
    createCommentOnUserDto.userId = request.user.id
    return this.commentService.createCommentOnUserDto(createCommentOnUserDto);
  }
  @Get('/search/:search')
  async getSearch(@Param('search', IdValidationpipe) search: string) {
    const searchValue = search.slice(1, search.length);
    const product = await this.userService.getSearch(searchValue);
    if (!product) {
      throw new NotFoundException(VideoByIdNotFount);
    }
    return product;
  }
  @UseGuards(JwtAuthGuard)
  @Post('createComment')
  createVideo(@Req() request, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.writtenById = request.user.id
    return this.commentService.createCommentDto(createCommentDto);
  }
}
