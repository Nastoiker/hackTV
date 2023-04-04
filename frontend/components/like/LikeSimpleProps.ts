import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IVideo} from "@/types/Video.interface";

export interface  LikeSimpleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLike: boolean;
  setLike: () => void;
}
