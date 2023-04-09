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
  HttpStatus, UseInterceptors, UseGuards, Query, Req, BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateCommentDto} from "./dto/createComment-dto";
import {LikeCommentDto} from "./dto/likeComment-dto";
import {VideoService} from "../video/video-service";
import {CreateCommentOnUserDto} from "../comment/dto/create-comment.dto";
import {CommentService} from "../comment/comment.service";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly videoService: VideoService, private  readonly commentService: CommentService) {}

  // @Post('/createComment')
  // @UseGuards(JwtAuthGuard)
  // createComment(@Body() commentDto: CreateCommentDto) {
  //   return this.userService.createComment(commentDto);
  // }
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
  @Post('updateProfile')
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
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  DeleteVideo(@Param('id') id: string) {
    return this.videoService.deleteVideo({id});
  }
  @UseGuards(JwtAuthGuard)
  @Post('createCommentOnUser')
  createUserComment(@Req() request, @Body() createCommentOnUserDto: CreateCommentOnUserDto) {
    createCommentOnUserDto.userId = request.user.id
    return this.commentService.createCommentOnUserDto(createCommentOnUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createComment')
  createVideo(@Req() request, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.writtenById = request.user.id
    return this.commentService.createCommentDto(createCommentDto);
  }
}
