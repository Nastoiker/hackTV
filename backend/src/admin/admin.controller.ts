import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {AdminJwtAuthGuard} from "../auth/guards/admin.guard";
import {CreateReportDto} from "./dto/create-report.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(AdminJwtAuthGuard)
  @Post('addAdmin')
  createAdmin(@Body() {id}:  { id: string } ) {
    return this.adminService.createAdmin(id);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('createReport')
  createReport(@Body() dto:  CreateReportDto ) {
    return this.adminService.createReport(dto);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('banAdmin')
  banAdmin(@Body() {id}:  { id: string }) {
    return this.adminService.removeAdminAbility(id);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('banAdmin')
  unBanUser(@Body() {id}:  { id: string }) {
    return this.adminService.removeAdminAbility(id);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('removeAdmin')
  removeAdminAbility(@Body() {id}:  { id: string }) {
    return this.adminService.removeAdminAbility(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  @Get('banUser:id')
  babOneUser(@Param('id') id: string) {
    return this.adminService.banOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('Video:id')
  removeVideo(@Param('id') id: string) {
    return this.adminService.removeVideo(id);
  }
}
