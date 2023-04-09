import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Comment} from "@/types/Video.interface";
import {IUser} from "@/types/User.interface";

export interface ICommentsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsOpen: () => void;
  comments: Comment[];
  user?: IUser,
  video: IVideo,
}
export interface ICommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comment: Comment;
}
