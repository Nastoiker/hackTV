import { createFirstCategoryDto, createSecondCategoryDto } from './dto/create-category.dto';
import { PrismaService } from "../prisma/prisma-service";
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    categories(): Promise<(import(".prisma/client").FirstLevelCategory & {
        secondLevelCategory: import(".prisma/client").SecondLevelCategory[];
    })[]>;
    createFirstCategory(firstLevelCategory: createFirstCategoryDto): Promise<import(".prisma/client").FirstLevelCategory>;
    deleteSecondCategory(id: string): Promise<import(".prisma/client").SecondLevelCategory>;
    deleteFirstCategory(id: string): Promise<import(".prisma/client").FirstLevelCategory>;
    createSecondCategory(createSecondCategory: createSecondCategoryDto): Promise<import(".prisma/client").SecondLevelCategory>;
}
