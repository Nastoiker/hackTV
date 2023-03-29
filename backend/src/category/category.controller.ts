import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UnauthorizedException
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {CreateCategoryDto, createFirstCategoryDto, createSecondCategoryDto} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {AdminJwtAuthGuard} from "../auth/guards/admin.guard";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AdminJwtAuthGuard)
  @Post('createFirstCategory')
  createFirstCategory(@Query() query, @Body() createFirstCategory: createFirstCategoryDto) {
    return this.categoryService.createFirstCategory(createFirstCategory);
  }
  @UseGuards(AdminJwtAuthGuard)

  @Post('createSecondCategory') createSecondCategory(@Body() createSecondCategory: createSecondCategoryDto) {
    return this.categoryService.createSecondCategory(createSecondCategory);
  }
  @Get()
  findAll() {
    return this.categoryService.categories();
  }
  @UseGuards(AdminJwtAuthGuard)
  @Delete('deleteFirstCategory:id')
  deleteFirstCategory(@Body() id: string) {
    return this.categoryService.deleteFirstCategory(id);
  }
  @Delete('deleteSecondCategory:id') deleteSecondCategory(@Param('id') id: string) {
    return this.categoryService.deleteFirstCategory(id);
  }
}
