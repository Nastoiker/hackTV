import {ICommentProps, ICommentUser} from "./Comment.props";
import {useState} from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
export const CommentCard = ({comment}: ICommentProps): JSX.Element => {
  return <div className={"flex justify-between"}>
      <div className={"flex"}><Image alt={'avatar'} src={comment.writtenBy.avatar}/> <div><h1>{comment.writtenBy.login}</h1> <p></p></div></div>
    <div><span>{comment.createdAt}</span></div>
  </div>
}
