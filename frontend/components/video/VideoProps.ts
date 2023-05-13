import { DetailedHTMLProps, HTMLAttributes } from "react"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"

export interface VideoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideo
  user?: IUser
  activeVideo: string
  onClickVideoProps: () => void
}
