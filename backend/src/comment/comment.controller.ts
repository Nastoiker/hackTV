import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { CommentService } from './comment.service';
import {CreateCommentDto, CreateCommentOnUserDto} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
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
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
