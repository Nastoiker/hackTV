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
import { useRouter } from "next/navigation"
const PageRegistration = () => {
  const router =  useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IRegister>({
    defaultValues: {
      role: 'user',
      authorUrl: 'http://user',
    }
  });
  const [password, notCorrect] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);
  const [registrationFunc, isLoading] = useRegistrationMutation({});
  const onSubmit = async (formData: IRegister) => {
     try {
       delete formData.confirm_password;
       const { confirm_password, ...dataAuth} = formData;
       console.log(dataAuth);
       await registrationFunc(dataAuth);
       setError(false);
       window.location.href = '/'
     } catch (e) {
       console.log(e.message);
        setError(true);
     }

  }
  return (
    <div className="mx-auto bg-background max-w-[500px]">
      <form
        className={"space-y-5 border p-10 my-5 rounded-2xl"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Htag type='h1' className='text-center' >Регистрация</Htag>
        <p className="text-center">
          Есть аккаунт?
          <Link className="border-b-2" href='/authorization'>Авторизируйтесь</Link>
        </p>

        <Label htmlFor={"email"}>Emal</Label>
        <Input error={errors.email} {...register("email", { required:  {value: true,  message: "Заполните email"}, pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Введите  email",
          }, })} id={"email"} />
        <Label htmlFor={"login"}>Login</Label>
        <Input error={errors.login} {...register("login", { required:  {value: true,  message: "Заполните login"} })} id={"login"} />
        <Label htmlFor={"number"}>Номер телефона</Label>
        <Input
          error={errors.phone}
          type={"string"}
          {...register("phone", { required: {value: true,  message: "Заполните номер"},  pattern: {
              value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              message: "Введите  номер",
            } })}
          id={"number"}
        />
        <Label htmlFor={"password"}>Пароль</Label>
        <Input type={"password"} error={errors.hashpassword} {...register("hashpassword", { required: {value: true,  message: "Заполните пароль"} })} id={"password"} />
        <Label htmlFor={"passwordVerif"}>Подтверждение пароля</Label>
        <Input error={errors.confirm_password} type={"password"} id={"passwordVerif"} {...register("confirm_password", {
          required: {value: true,  message: "Подтвердите пароль"},
          validate: (val: string) => {
            if (watch('hashpassword') != val) {
              return "Пароль должен совпадать";
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
