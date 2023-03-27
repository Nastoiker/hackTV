import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {PrismaService} from "../prisma/prisma-service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
  private prisma: PrismaService) {
  }
  async createAdmin(id: string) {
    return this.prisma.userModel.update({
          where: {
            id
          },
          data: {
            role: 'admin'
          }
        }
    );
  }
  async removeAdminAbility(id: string) {
    return  this.prisma.userModel.update({
          where: {
            id
          },
          data: {
            role: 'user'
          }
        }
    );
  }
  async banOne(id: string) {
    return this.prisma.userModel.update({
      where: {
        id
      },
      data: {
        isActive: false,
      }
    })
  }
  async removeVideo(id: string) {
    return this.prisma.video.delete({
      where: {
        id
      }
    }
    );
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return ;
  }
}
