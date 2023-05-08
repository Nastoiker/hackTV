import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"

export interface LikeProps {
  video: IVideo
  user: IUser
}
