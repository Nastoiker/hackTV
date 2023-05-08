import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"

export interface IMusic {
  id: string
  name: string
  alias: string
  img: string
  music_url: string
  videos: IVideo[]
  user: IUser
}
