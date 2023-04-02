import { CategoryService } from './category.service';
import { createFirstCategoryDto, createSecondCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createFirstCategory(query: any, createFirstCategory: createFirstCategoryDto): Promise<import(".prisma/client").FirstLevelCategory>;
    createSecondCategory(createSecondCategory: createSecondCategoryDto): Promise<import(".prisma/client").SecondLevelCategory>;
    findAll(): Promise<(import(".prisma/client").FirstLevelCategory & {
        secondLevelCategory: import(".prisma/client").SecondLevelCategory[];
    })[]>;
    deleteFirstCategory(id: string): Promise<import(".prisma/client").FirstLevelCategory>;
    deleteSecondCategory(id: string): Promise<import(".prisma/client").FirstLevelCategory>;
}
