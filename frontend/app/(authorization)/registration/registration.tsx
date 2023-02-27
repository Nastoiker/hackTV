import {useForm} from "react-hook-form";
import {ISearch} from "@/types/Search.interface";
import {IRegister} from "@/types/Register.interface";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export const Registration = () => {
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<IRegister>();
  const onSubmit = async (formData: IRegister) => {

  }
  return <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"email"}>Emal</Label>
      <Input { ...register('email', {required: true})} id={"email"}/>
      <Label htmlFor={"login"}>Login</Label>
      <Input { ...register('login', {required: true})} id={"login"}/>
      <Label htmlFor={"password"}>Password</Label>
      <Input { ...register('password', {required: true})} id={"password"}/>
      <Label htmlFor={"number"}>Номер телефона</Label>
      <Input type={"number"} { ...register('phone', {required: true})} id={"number"}/>
      <Label htmlFor={"years"}>Сколько вам лет</Label>
      <Input { ...register('years', {required: true, min: 8, max: 87})} id={"years"}/>
      <Label htmlFor={"gender"}>Password</Label>
      <select id="gender">
        <option value="man">Мужчина</option>
        <option value="woman">Женщина</option>
      </select>
      <Input { ...register('gender', {required: true})} id={"gender"}/>

      <Button type={"submit"}>Регистрация</Button>
    </form>
  </div>
}
