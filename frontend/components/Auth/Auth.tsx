"use client"

import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useAuthorizationQuery } from "@/stores/slices/regapi"
import { useForm } from "react-hook-form"

import { ILogin } from "@/types/login.interface"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const AuthComponent = () => {
  const [login, setLogin] = useState<ILogin>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm<ILogin>();
  const{ data, isLoading, error } = useAuthorizationQuery(login);
  const onSubmit = async (formData: ILogin) => {
    try {
      setLogin(formData)
      if(localStorage.getItem('token')) {
        location.reload();
      }
    } catch {
      console.log(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Авторизация</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
          <DialogDescription>
            <Link href={'/registration'} >Нет аккаунта? Зарегистрируйтесь</Link>
          </DialogDescription>
        </DialogHeader>
        <form  className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor={"email"}>Emal</Label>
          <Input error={errors.email} {...register("email", { required: {value: true,  message: "Заполните email"}, pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Введите  email",
            } }, )} id={"email"} />
          <Label htmlFor={"password"}>Password</Label>
          <Input error={errors.password} type={"password"} {...register("password", { required: {value: true,  message: "Заполните пароль"} })} id={"password"} />
          <Button type={"submit"}>Авторизация</Button>
        </form>
        {
          (error && ('status' in error) && error.status===401)  && <div>
              <p>Ошибка авторизации</p>
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}
