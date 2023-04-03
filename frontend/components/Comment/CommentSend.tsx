import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ISendComment} from "@/components/Comment/Comment.props";
import {Textarea} from "@/components/ui/textarea";

export const CommentForm = () => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ISendComment>();
  const onSubmit = async (formData: ISendComment) => {

  }
  return <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"comment"}>Comment</Label>
      <Textarea { ...register('comment', {required: true})} id={"comment"}/>
      <Button type={"submit"}>Оставить комментарий</Button>
    </form>
  </div>
}
