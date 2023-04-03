import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from '@prisma/client';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import {PrismaService} from "../prisma/prisma-service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import * as fs from "fs";
import {type} from "os";
@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}
	async createUser(dto: CreateUserDto) {
		const salt = await genSalt(10);
		const password = dto.hashpassword ;
		dto.hashpassword = await hash(password, salt);
		const user = await  this.prisma.userModel.create({data: {...dto}});
		fs.mkdirSync('uploads/users/' + user.id);
		fs.mkdirSync('uploads/users/' + user.id + '/video');
		fs.mkdirSync('uploads/users/' + user.id + '/music');
		fs.mkdirSync('uploads/users/' + user.id + '/avatar');
		return user;
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
	async authByJwt(id: string) {
		return this.prisma.userModel.findUnique({
			where: {id},
			include: {videos: true, Comment: true, folowing: true, folowers: true, Like: true, userComment: true, music: true}
		});
	}
	async login(email: string) {
		const payLoad = { email, role: 'user' };
		return {
			accesToken: await this.jwtService.signAsync(payLoad),
		};
	}
}
