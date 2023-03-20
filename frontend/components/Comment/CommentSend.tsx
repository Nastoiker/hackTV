import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ISendComment} from "@/components/Comment/Comment.props";

export const CommentForm = (comment: Comment) => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ISendComment>();
  const onSubmit = async (formData: ICommentForm) => {

  }
  return <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"comment"}>Comment</Label>
      <Input { ...register('comment', {required: true})} id={"comment"}/>
      <Button type={"submit"}>Оставить комментарий</Button>
    </form>
  </div>
}
