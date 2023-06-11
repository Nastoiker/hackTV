import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {PrismaService} from "../prisma/prisma-service";
import {JwtService} from "@nestjs/jwt";
import {CreateReportDto} from "./dto/create-report.dto";
import {ReportVideo} from "../video/dto/report-video.dto";

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
  // async videoWithReport() : Promise<ReportVideo[] | null>{
  //     return this.prisma.reportVideo.findMany({orderBy: {
  //             createdAt: 'asc',
  //         }, });
  // }
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
    async unBanOne(id: string) {
        return this.prisma.userModel.update({
            where: {
                id
            },
            data: {
                isActive: true,
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
    async removeUser(id: string) {
        return this.prisma.video.delete({
                where: {
                    id
                }
            }
        );
    }
  async createReport(dto: CreateReportDto) {
    return this.prisma.reportVideo.create({
          data: {
            ...dto
          }
        }
    );
  }
}
