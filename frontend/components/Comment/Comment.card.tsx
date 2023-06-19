import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { convertDate } from "@/helpers/Data"
import UserIconBlack from "@/public/UserBlack.svg"
import { motion } from "framer-motion"
import UserIcon from "@/public/User.svg"

import { LikeSimple } from "@/components/like/LikeSimple"
import { Separator } from "@/components/ui/separator"
import { ICommentProps } from "./Comment.props"
import {useTheme} from "next-themes";
import {api_url} from "@/domen.api";

export const CommentCard = ({ comment }: ICommentProps): JSX.Element => {
  const {theme, setTheme} = useTheme();
  return (
    <div className={"space-y-3 mb-5"}>
      <div className={"flex items-start  space-x-3 justify-between"}>
        <Link
          href={"/channel/" + comment.writtenById}
          className={"flex space-x-2"}
        >
          <Image
            alt={"avatar"}
            className={"rounded-3xl w-12 h-12"}
            height={30}
            width={30}
            src={
              comment.writtenBy.avatar
                ? `${api_url}/user` + comment.writtenBy.avatar
                :  theme==='light' ? UserIconBlack : UserIcon
            }
          />
          <h1>{comment.writtenBy.login}</h1>
        </Link>{" "}
        <span className={"text-gray-500"}>
          {convertDate(new Date(comment.createdAt))}
        </span>
      </div>
      <div className={"flex justify-between pl-4 "}>
        {" "}
        <p className={"w-40"}>{comment.comment}</p>
        {/*<LikeSimple className={"w-10 h-10"}/>*/}
      </div>
      <Separator className="my-2" />
    </div>
  )
}
