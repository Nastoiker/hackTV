import {IVideo} from "@/types/Video.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IUser} from "@/types/User.interface";

export interface  VideoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideo;
  type: string;
}
