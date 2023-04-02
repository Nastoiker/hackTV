import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateReportDto } from "./dto/create-report.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdmin({ id }: {
        id: string;
    }): Promise<import(".prisma/client").UserModel>;
    createReport(dto: CreateReportDto): Promise<import(".prisma/client").ReportVideo>;
    banAdmin({ id }: {
        id: string;
    }): Promise<import(".prisma/client").UserModel>;
    unBanUser({ id }: {
        id: string;
    }): Promise<import(".prisma/client").UserModel>;
    removeAdminAbility({ id }: {
        id: string;
    }): Promise<import(".prisma/client").UserModel>;
    findOne(id: string): string;
    babOneUser(id: string): Promise<import(".prisma/client").UserModel>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    removeVideo(id: string): Promise<import(".prisma/client").Video>;
}
