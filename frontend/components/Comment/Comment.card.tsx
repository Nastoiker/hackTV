import {ICommentProps, ICommentUser} from "./Comment.props";
import {useState} from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import {convertDate} from "@/helpers/Data";
import {LikeSimple} from "@/components/like/LikeSimple";
import {Separator} from "@/components/ui/separator";
export const CommentCard = ({comment}: ICommentProps): JSX.Element => {
  return <div className={"space-y-3"}>
      <div className={"flex items-start  space-x-3 justify-between"}><div className={"flex space-x-2"}><Image alt={'avatar'} className={"rounded-3xl w-12 h-12"} height={30}  width={30} src={ 'http://localhost:8000/user' + comment.writtenBy.avatar}/><h1>{comment.writtenBy.login}</h1></div> <span className={"text-gray-500"}>{convertDate(new Date(comment.createdAt))}</span></div>
    <div className={"flex justify-between pl-4 "}> <p className={"w-40"}>{comment.comment}</p> <LikeSimple className={"w-10 h-10"}/> </div>
    <Separator className="my-2" />
  </div>
}
