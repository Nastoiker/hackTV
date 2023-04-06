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
  HttpStatus, UseInterceptors, UseGuards, Query, Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateCommentDto} from "./dto/createComment-dto";
import {LikeCommentDto} from "./dto/likeComment-dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createComment')
  @UseGuards(JwtAuthGuard)
  createComment(@Body() commentDto: CreateCommentDto) {
    return this.userService.createComment(commentDto);
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
  unfollowChannel(@Req() query, @Body() { authorId }: { authorId: string }) {
    const userId = query.user.id;
    return this.userService.unfollowChannel(userId, authorId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ where: {id}, data: updateUserDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({id});
  }
}
