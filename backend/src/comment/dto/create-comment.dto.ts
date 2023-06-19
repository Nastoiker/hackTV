export class CreateCommentDto {
  comment: string;
  videoId: string;
  writtenById: string;
  pictures?: string;
}
export class CreateCommentOnUserDto {
  comment: string;
  parentId: string;
  userId: string;
}
