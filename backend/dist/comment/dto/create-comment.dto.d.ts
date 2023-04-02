export declare class CreateCommentDto {
    comment: string;
    videoId: string;
    writtenById: string;
    pictures?: string;
}
export declare class CreateCommentOnUserDto {
    comment: string;
    parentId: string;
    userId: string;
}
