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
import {useRegistrationMutation} from "@/stores/slices/regapi";
import {useState} from "react";
const PageRegistration = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IRegister>();
  const [error, setError] = useState<boolean>(false);
  const [registrationFunc, isLoading] = useRegistrationMutation({});
  const onSubmit = async (formData: IRegister) => {
     try {
       await registrationFunc(formData);
       setError(false);
     } catch (e) {
        setError(true);
     }

  }
  return (
    <div className="mx-auto max-w-[500px]">
      <form
        className={"space-y-5 text-black border p-10 my-5 rounded-2xl"}
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
          type={"string"}
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
        <Input type={"password"} id={"passwordVerif"} {...register("confirm_password", {
          required: true,
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do no match";
            }
          },
        })} />
        <div className={"text-center"}>
          {" "}
          <Button type={"submit"} className={"w-full text-center"}>
            Регистрация
          </Button>
        </div>
        { error && <div>
          <h1>
            Ошибка регистрации
          </h1>
        </div> }
      </form>
    </div>
  )
}
export default PageRegistration
