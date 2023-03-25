import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from '@prisma/client';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import {PrismaService} from "../prisma/prisma-service";
@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}
	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);

	}
	async findUser(email: string): Promise<UserModel | null> {
		return this.prisma.userModel.findFirst({where: { email }});
	}
	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const User = await this.findUser(email);
		if (!User) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectUser = await compare(password, User.hashpassword);
		if (!isCorrectUser) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return { email: User.email };
	}
	async login(email: string) {
		const payLoad = { email };
		return {
			accesToken: await this.jwtService.signAsync(payLoad),
		};
	}
}
