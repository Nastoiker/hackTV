import { AuthGuard } from '@nestjs/passport';
import {PrismaService} from "../../prisma/prisma-service";
import {ExecutionContext} from "@nestjs/common";

export class JwtAuthGuard extends AuthGuard('jwt') {
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
            select: { role: true, isActive: true },
        });
        return userData && userData.isActive;
    }
}
