"use client"

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
import {useAuthorizationQuery} from "@/stores/slices/regapi";
import {useForm} from "react-hook-form";
import {ILogin} from "@/types/login.interface";
import {useState} from "react";
import {redirect} from "next/navigation";
import Link from "next/link";

export const AuthComponent= () => {
  const [login, setLogin] = useState<ILogin>();
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ILogin>();
  const { data, isLoading, error } = useAuthorizationQuery(login);

  const onSubmit = async (formData: ILogin) => {
    setLogin(formData);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Авторизация</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form action="" className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor={"email"}>Emal</Label>
          <Input { ...register('email', {required: true})} id={"email"}/>
          <Label htmlFor={"password"}>Password</Label>
          <Input { ...register('password', {required: true})} id={"email"}/>
          <Button type={"submit"}>Авторизация</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
