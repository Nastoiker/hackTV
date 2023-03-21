import {IVideo} from "@/types/Video.interface";
import {IUser} from "@/types/User.interface";

export interface LikeProps {
  video: IVideo;
  user: IUser;
}
