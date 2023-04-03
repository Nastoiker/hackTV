import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Comment} from "@/types/Video.interface";

export interface ICommentsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsOpen: () => void;
  comments: Comment[];
}
export interface ICommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comment: Comment;
}
