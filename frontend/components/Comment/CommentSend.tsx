import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ISendComment} from "@/components/Comment/Comment.props";
import {Textarea} from "@/components/ui/textarea";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import axios from "axios";
import {useLikeVideoMutation} from "@/stores/slices/user.api";

export const CommentForm = () => {
  const user  = useCheckAuthQuery({});
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ISendComment>();
  const  [commentVideo, { isLoading, isError, data, error }] =  useLikeVideoMutation();

  const onSubmit = async (formData: ISendComment) => {
    const result = await commentVideo(formData);
  }
  return <div className="space-y-3 mt-2">
    <Label htmlFor={"comment"}>Оставьте свой комментарий</Label>

    { isError ? <h1>Войдите в аккаунт</h1>  :
    <form action=""   onSubmit={handleSubmit(onSubmit)}>
      <Textarea placeholder={'comment'} { ...register('comment', {required: true})} id={"comment"}/>

      <div className={"flex"}><Button type={"submit"}>Оставить комментарий</Button></div>
    </form>
    }
  </div>
}
