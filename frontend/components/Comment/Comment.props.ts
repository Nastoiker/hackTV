import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface ICommentsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comments: ICommentUser[];
}
export interface ICommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  comment: ICommentUser;
}
export interface ICommentUser {
  id: string
  createdAt: string
  likeCount: number
  pictures: any
  comment: string
  writtenById: string
  videoId: string
    writtenBy: WrittenBy
  userComments: UserComment[]
}

export interface WrittenBy {
  id: string
  authorUrl: string
  email: string
  login: string
  phone: string
  hashpassword: string
  isActive: boolean
  avatar: string
  role: string
  subscribers_count: number
  following_count: number
  LikeCount: number
  hisLikes: number
}

export interface UserComment {
  id: string
  createdAt: string
  likeCount: number
  comment: string
  parentId: string
  userId: string
  user: User
}

export interface User {
  id: string
  authorUrl: string
  email: string
  login: string
  phone: string
  hashpassword: string
  isActive: boolean
  avatar: string
  role: string
  subscribers_count: number
  following_count: number
  LikeCount: number
  hisLikes: number
}
