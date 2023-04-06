import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {AdminJwtAuthGuard} from "../auth/guards/admin.guard";
import {CreateReportDto} from "./dto/create-report.dto";
import {Prisma, UserModel} from "@prisma/client";
import {UserService} from "../user/user.service";
import {createFirstCategoryDto, createSecondCategoryDto} from "../category/dto/create-category.dto";
import {CategoryService} from "../category/category.service";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly userService: UserService, private readonly categoryService: CategoryService) {}
  @UseGuards(AdminJwtAuthGuard)
  @Post('addAdmin')
  createAdmin(@Body() {id}:  { id: string } ) {
    return this.adminService.createAdmin(id);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('addAdmin')
  videoWithReport(@Body() {id}:  { id: string } ) {
    return this.adminService.createAdmin(id);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('createReport')
  createReport(@Body() dto:  CreateReportDto ) {
    return this.adminService.createReport(dto);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Get('createReport')
  getAllUsers( ) {
    return this.userService.users({});
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
  @UseGuards(AdminJwtAuthGuard)
  @Post('createFirstCategory')
  createFirstCategory(@Req() query, @Body() createFirstCategory: createFirstCategoryDto) {
    return this.categoryService.createFirstCategory(createFirstCategory);
  }
  @UseGuards(AdminJwtAuthGuard)
  @Post('createSecondCategory') createSecondCategory(@Body() createSecondCategory: createSecondCategoryDto) {
    return this.categoryService.createSecondCategory(createSecondCategory);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete('deleteFirstCategory:id')
  deleteFirstCategory(@Body() id: string) {
    return this.categoryService.deleteFirstCategory(id);
  }
  @Delete('deleteSecondCategory:id') deleteSecondCategory(@Param('id') id: string) {
    return this.categoryService.deleteFirstCategory(id);
  }
  @Delete('Video:id')
  removeVideo(@Param('id') id: string) {
    return this.adminService.removeVideo(id);
  }
}
