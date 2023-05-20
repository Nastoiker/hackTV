"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useCheckAuthQuery } from "@/stores/slices/regapi"
import {
  useCommentVideoMutation,
  useLikeVideoMutation,
} from "@/stores/slices/user.api"
import axios from "axios"
import { useForm } from "react-hook-form"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ISendComment {
  videoId: string
  comment: string
  sendComment,
}
export const CommentForm = ({
  video,
  user,
                              sendComment,
}: {
  video: IVideo
  user?: IUser
  sendComment: () => void,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISendComment>()
  const [commentVideo, { isLoading, isError, data, error }] =
    useCommentVideoMutation()
  useEffect(() => {}, [data])
  const onSubmit = async (formData: ISendComment) => {
    formData.videoId = video.id
    const result = await commentVideo(formData)
    console.log("commentres" + result + data)
    sendComment();
  }
  return (
    <div className="space-y-3 mt-2 rounded-3xl bg-blue-50 p-5">
      <Label htmlFor={"comment"}>Оставьте свой комментарий</Label>
      <div className={"block bg-white rounded-xl p-3"}>
        {user ? (
          <form
            action=""
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Textarea
              className={"text-black"}
              placeholder={"comment"}
              {...register("comment", { required: true })}
              id={"comment"}
            />

            <div className={"flex"}>
              <Button type={"submit"}>Оставить комментарий</Button>
            </div>
          </form>
        ) : (
          <Link href={"/registration"}>Войдите в аккаунт</Link>
        )}
      </div>
    </div>
  )
}
