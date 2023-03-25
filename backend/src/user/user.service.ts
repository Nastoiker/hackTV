import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel, Prisma } from '@prisma/client';
import {PrismaService} from "../prisma/prisma-service";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
      userWhereUniqueInput: Prisma.UserModelWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prisma.userModel.findUnique({
      where: userWhereUniqueInput,
    });
  }

    async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserModelWhereUniqueInput;
    where?: Prisma.UserModelWhereInput;
    orderBy?: Prisma.UserModelOrderByWithRelationInput;
  }): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userModel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserModelCreateInput): Promise<UserModel> {
    return this.prisma.userModel.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserModelWhereUniqueInput;
    data: Prisma.UserModelUpdateInput;
  }): Promise<UserModel> {
    const { where, data } = params;
    return this.prisma.userModel.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserModelWhereUniqueInput): Promise<UserModel> {
    return this.prisma.userModel.delete({
      where,
    });
  }
}
