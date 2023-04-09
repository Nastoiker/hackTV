"use client";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import axios from "axios";
import {useCommentVideoMutation, useLikeVideoMutation} from "@/stores/slices/user.api";
import {IUser} from "@/types/User.interface";
import Link from "next/link";
import {IVideo} from "@/types/Video.interface";
interface ISendComment {
  videoId: string;
  comment: string;
}
export const CommentForm = ({video, user} : {  video: IVideo, user?: IUser}) => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ISendComment>();
  const  [commentVideo, { isLoading, isError, data, error }] =  useCommentVideoMutation();

  const onSubmit = async (formData: ISendComment) => {
    formData.videoId = video.id;
    const result = await commentVideo(formData);
    console.log('commentres' + result + data);
  }
  return <div className="space-y-3 mt-2 rounded-3xl bg-blue-50 p-5">
    <Label htmlFor={"comment"}>Оставьте свой комментарий</Label>
    <div className={"block bg-white rounded-xl p-3"}>
      { user ?
        <form action=""   className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Textarea placeholder={'comment'} { ...register('comment', {required: true})} id={"comment"}/>

          <div className={"flex"}><Button type={"submit"}>Оставить комментарий</Button></div>
        </form> : <Link href={'/registration'}>Войдите в аккаунт</Link>
      }
    </div>

  </div>
}
