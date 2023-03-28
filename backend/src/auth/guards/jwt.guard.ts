import { AuthGuard } from '@nestjs/passport';
import {PrismaService} from "../../prisma/prisma-service";
import {ExecutionContext, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ExtractJwt} from "passport-jwt";
import { UserModel } from '@prisma/client'
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

}
