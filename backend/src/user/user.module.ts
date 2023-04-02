import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../prisma/prisma-service";
import {ServeStaticModule} from "@nestjs/serve-static";
import {path} from "app-root-path";

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}`,
    serveRoot: '/user',
  }),],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
