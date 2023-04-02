import { CommentService } from './comment.service';
import { CreateCommentDto, CreateCommentOnUserDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createUserComment(request: any, createCommentOnUserDto: CreateCommentOnUserDto): Promise<import(".prisma/client").UserCommentOnComment>;
    createVideo(request: any, createCommentDto: CreateCommentDto): Promise<import(".prisma/client").Comment>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(id: string): string;
}
