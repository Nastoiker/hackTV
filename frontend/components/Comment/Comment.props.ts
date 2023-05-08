import { DetailedHTMLProps, HTMLAttributes } from "react"

import { IUser } from "@/types/User.interface"
import { Comment, IVideo } from "@/types/Video.interface"

export interface ICommentsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsOpen?: () => void
  comments: Comment[]
  user?: IUser
  video: IVideo
}
export interface ICommentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comment: Comment
}
