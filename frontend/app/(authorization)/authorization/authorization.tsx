import {useForm} from "react-hook-form";
import {ISearch} from "@/types/Search.interface";
import {IRegister} from "@/types/Register.interface";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {ILogin} from "@/types/login.interface";

export const Authorization = () => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ILogin>();
  const onSubmit = async (formData: ILogin) => {

  }
  return <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"email"}>Emal</Label>
      <Input { ...register('email', {required: true})} id={"email"}/>
      <Label htmlFor={"password"}>Password</Label>
      <Input { ...register('password', {required: true})} id={"email"}/>
      <Button type={"submit"}>Авторизация</Button>
    </form>
  </div>
}
