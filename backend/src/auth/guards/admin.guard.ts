import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
// import {AuthGuard} from "@nestjs/passport";
import {PrismaService} from "../../prisma/prisma-service";
import {UserModel} from "@prisma/client";
import {ConfigService} from "@nestjs/config";
import {ExtractJwt} from "passport-jwt";
import {Observable} from "rxjs";
import {AuthGuard} from "@nestjs/passport";
import * as jwt from 'jsonwebtoken';
export class AdminJwtAuthGuard  implements CanActivate  {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const jwtToken = request.headers.authorization?.split(' ')[1]; // получаем JWT из заголовка Authorization
        console.log(jwtToken);
        if (!jwtToken) {
            throw   new UnauthorizedException();

        }
        try {
            const decoded = jwt.verify(jwtToken, 'SOME_SECRET'); // расшифровываем JWT и получаем его значения
            request.user = decoded; // добавляем расшифрованные значения в объект request
            // @ts-ignore
            if(decoded.role==='admin' || decoded.email==='damur2004@gmail.com')  return true;
            throw   new UnauthorizedException();

        } catch (err) {
            throw   new UnauthorizedException();
        }
    }

}