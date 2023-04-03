import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ISendComment} from "@/components/Comment/Comment.props";
import {Textarea} from "@/components/ui/textarea";

export const CommentForm = ( ) => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ISendComment>();
  const onSubmit = async (formData: ISendComment) => {

  }
  return <div>
    <form action=""  className="space-y-3 mt-2" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"comment"}>Оставьте свой комментарий</Label>
      <Textarea placeholder={'comment'} { ...register('comment', {required: true})} id={"comment"}/>

      <div className={"flex"}><Button type={"submit"}>Оставить комментарий</Button></div>
    </form>
  </div>
}
