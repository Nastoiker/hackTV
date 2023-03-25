import { Module } from '@nestjs/common';
import {UserController} from "../user/user.controller";
import {UserService} from "../user/user.service";
import {PrismaService} from "../prisma/prisma-service";
import {VideoController} from "./video.controller";
import {VideoService} from "./video-service";

@Module({ controllers: [VideoController],
    providers: [VideoService, PrismaService],})
export class VideoModule {

}
