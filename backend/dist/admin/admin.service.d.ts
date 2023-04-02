import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from "../prisma/prisma-service";
import { CreateReportDto } from "./dto/create-report.dto";
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createAdmin(id: string): Promise<import(".prisma/client").UserModel>;
    removeAdminAbility(id: string): Promise<import(".prisma/client").UserModel>;
    banOne(id: string): Promise<import(".prisma/client").UserModel>;
    removeVideo(id: string): Promise<import(".prisma/client").Video>;
    createReport(dto: CreateReportDto): Promise<import(".prisma/client").ReportVideo>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): void;
}
