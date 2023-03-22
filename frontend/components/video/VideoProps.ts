import {IVideo} from "@/types/Video.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface  VideoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideo;
}
