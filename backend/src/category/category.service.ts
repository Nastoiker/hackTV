import { Injectable } from '@nestjs/common';
import {
  CreateCategoryDto,
  createFirstCategoryDto,
  createSecondCategoryDto,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma-service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async categories() {
    return this.prismaService.firstLevelCategory.findMany({
      where: {},
      include: {
        secondLevelCategory: true,
      },
    });
  }
  async createFirstCategory(firstLevelCategory: createFirstCategoryDto) {
    return this.prismaService.firstLevelCategory.create({
      data: firstLevelCategory,
    });
  }

  async deleteSecondCategory(id: string) {
    return this.prismaService.secondLevelCategory.delete({
      where: {
        id,
      },
    });
  }
  async deleteFirstCategory(id: string) {
    return this.prismaService.firstLevelCategory.delete({
      where: {
        id,
      },
    });
  }

  async createSecondCategory(createSecondCategory: createSecondCategoryDto) {
    return this.prismaService.secondLevelCategory.create({
      data: createSecondCategory,
    });
  }
}
