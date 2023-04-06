import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<(import(".prisma/client").FirstLevelCategory & {
        secondLevelCategory: import(".prisma/client").SecondLevelCategory[];
    })[]>;
}
