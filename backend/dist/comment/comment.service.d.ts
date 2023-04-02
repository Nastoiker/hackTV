import { CreateCommentDto, CreateCommentOnUserDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from "../prisma/prisma-service";
export declare class CommentService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createCommentDto(createCommentDto: CreateCommentDto): Promise<import(".prisma/client").Comment>;
    createCommentOnUserDto(createCommentOnUserDto: CreateCommentOnUserDto): Promise<import(".prisma/client").UserCommentOnComment>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
