export interface ICommentProps {
  comments: Comment[],

}
interface  Comment {
  comment: string;
  id: string;
}
interface User {

}
export interface ISendComment {
  comment: string;
  userId: string;
  videoId: string;
}
