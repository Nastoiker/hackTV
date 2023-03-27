import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtAuthGuard)
  @Post('addAdmin')
  createAdmin(@Body() {id}:  { id: string } ) {
    return this.adminService.createAdmin(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('banAdmin')
  banAdmin(@Body() {id}:  { id: string }) {
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
