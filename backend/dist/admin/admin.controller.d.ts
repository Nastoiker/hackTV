import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateReportDto } from "./dto/create-report.dto";
import { UserModel } from "@prisma/client";
import { UserService } from "../user/user.service";
import { createFirstCategoryDto, createSecondCategoryDto } from "../category/dto/create-category.dto";
import { CategoryService } from "../category/category.service";
export declare class AdminController {
    private readonly adminService;
    private readonly userService;
    private readonly categoryService;
    constructor(adminService: AdminService, userService: UserService, categoryService: CategoryService);
    createAdmin({ id }: {
        id: string;
    }): Promise<UserModel>;
    videoWithReport({ id }: {
        id: string;
    }): Promise<UserModel>;
    createReport(dto: CreateReportDto): Promise<import(".prisma/client").ReportVideo>;
    getAllUsers(): Promise<UserModel[]>;
    banAdmin({ id }: {
        id: string;
    }): Promise<UserModel>;
    unBanUser({ id }: {
        id: string;
    }): Promise<UserModel>;
    removeAdminAbility({ id }: {
        id: string;
    }): Promise<UserModel>;
    findOne(id: string): string;
    babOneUser(id: string): Promise<UserModel>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    createFirstCategory(query: any, createFirstCategory: createFirstCategoryDto): Promise<import(".prisma/client").FirstLevelCategory>;
    createSecondCategory(createSecondCategory: createSecondCategoryDto): Promise<import(".prisma/client").SecondLevelCategory>;
    deleteFirstCategory(id: string): Promise<import(".prisma/client").FirstLevelCategory>;
    deleteSecondCategory(id: string): Promise<import(".prisma/client").FirstLevelCategory>;
    removeVideo(id: string): Promise<import(".prisma/client").Video>;
}
