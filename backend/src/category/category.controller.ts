import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import {CreateCategoryDto, createFirstCategoryDto, createSecondCategoryDto} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createFirstCategory(@Body() createFirstCategory: createFirstCategoryDto) {
    return this.categoryService.createFirstCategory(createFirstCategory);
  }
  @Post() createSecondCategory(@Body() createSecondCategory: createSecondCategoryDto) {
    return this.categoryService.createSecondCategory(createSecondCategory);
  }
  @Get()
  findAll() {
    return this.categoryService.categories();
  }
  @Delete('deleteFirstCategory:id')
  deleteFirstCategory(@Body() id: string) {
    return this.categoryService.createFirstCategory(id);
  }
  @Delete('deleteSecondCategory:id') deleteSecondCategory(@Param('id') id: string) {
    return this.categoryService.createSecondCategory(id);
  }
}
