import { Injectable } from '@nestjs/common';
import {CreateCommentDto, CreateCommentOnUserDto} from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {PrismaService} from "../prisma/prisma-service";

@Injectable()
export class CommentService {
  constructor(private  readonly prismaService: PrismaService) {
  }
  async createCommentDto(createCommentDto: CreateCommentDto) {
    const {   comment, writtenById, videoId, pictures} = createCommentDto;
    return this.prismaService.comment.create({
      data: {  comment, writtenById, videoId, pictures }
    });
  }
  async createCommentOnUserDto(createCommentOnUserDto: CreateCommentOnUserDto) {
    const {   comment, userId, parentId} = createCommentOnUserDto;
    return  this.prismaService.userCommentOnComment.create({
      data: { comment, userId, parentId }
    });
  }
  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
