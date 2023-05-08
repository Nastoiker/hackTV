"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"

import { IRegister } from "@/types/Register.interface"
import { ISearch } from "@/types/Search.interface"
import { ILogin } from "@/types/login.interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PageAuth = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>()
  const onSubmit = async (formData: ILogin) => {}
  return (
    <div className={"m-auto w-fit p-5 space-y-5 bg-gray-200 rounded-2xl"}>
      <h1>Авторизация</h1>
      <form action="" className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={"email"}>Emal</Label>
        <Input {...register("email", { required: true })} id={"email"} />
        <Label htmlFor={"password"}>Password</Label>
        <Input {...register("password", { required: true })} id={"email"} />
        <Button type={"submit"}>Авторизация</Button>
      </form>
      <button className={"mx-auto block"}>Забыл пароль</button>
      <Link href={"/registration"}>Создать аккаунт</Link>
    </div>
  )
}
export default PageAuth
