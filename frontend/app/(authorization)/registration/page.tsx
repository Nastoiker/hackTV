"use client"

import { Select, SelectValue } from "@radix-ui/react-select"
import { useForm } from "react-hook-form"

import { IRegister } from "@/types/Register.interface"
import { ISearch } from "@/types/Search.interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Htag } from "@/components/Htag/Htag"
import Link from 'next/link';
const PageRegistration = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>()
  const onSubmit = async (formData: IRegister) => {}
  return (
    <div className="mx-auto max-w-[500px]">
      <form
        action=""
        className={"space-y-5 border p-10 my-5 rounded-2xl"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Htag type='h1' className='text-center' >Регистрация</Htag>
        <p className="text-center">
          Есть аккаунт? 
          <Link className="border border-b-2" href='/authorization'>Авторизируйтесь</Link>
        </p>
        <Label htmlFor={"email"}>Emal</Label>
        <Input error={errors.email} {...register("email", { required: true, pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Введите  email",
          }, })} id={"email"} />
        <Label htmlFor={"login"}>Login</Label>
        <Input {...register("login", { required: true })} id={"login"} />
        <Label htmlFor={"number"}>Номер телефона</Label>
        <Input
          type={"number"}
          {...register("phone", { required: true })}
          id={"number"}
        />
        <Label htmlFor={"years"}>Ваш возраст</Label>
        <Input
          {...register("years", { required: true, min: 8, max: 87 })}
          id={"years"}
        />
        <Label htmlFor={"gender"}>Гендер</Label>
        <select className={"block outline-0"} id="gender">
          <option value="man">Мужчина</option>
          <option value="woman" className={"p-7"}>
            Женщина
          </option>
        </select>
        <Input {...register("gender", { required: true })} id={"gender"} />
        <Label htmlFor={"password"}>Пароль</Label>
        <Input type={"password"} {...register("password", { required: true })} id={"password"} />
        <Label htmlFor={"passwordVerif"}>Подтверждение пароля</Label>
        <Input type={"password"} id={"passwordVerif"} />
        <div className={"text-center"}>
          {" "}
          <Button type={"submit"} className={"w-full text-center"}>
            Регистрация
          </Button>
        </div>
      </form>
    </div>
  )
}
export default PageRegistration
