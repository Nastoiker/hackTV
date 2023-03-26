import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {PrismaService} from "../../prisma/prisma-service";

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        const userData = await this.prisma.userModel.findUnique({
            where: { id: user.sub },
            select: { role: true },
        });
        return userData && userData.role === 'admin';
    }
}