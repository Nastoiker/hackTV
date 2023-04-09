import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../prisma/prisma-service";
import {ServeStaticModule} from "@nestjs/serve-static";
import {path} from "app-root-path";
import {VideoService} from "../video/video-service";
import {CommentService} from "../comment/comment.service";

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}`,
    serveRoot: '/user',
  }),],
  controllers: [UserController],
  providers: [UserService, PrismaService, VideoService, CommentService],
})
export class UserModule {}
