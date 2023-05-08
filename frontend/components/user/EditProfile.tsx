import axios from "axios"
import { useForm } from "react-hook-form"

import { DOMEN } from "@/types/domen.backend"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IEditProfile {}
export const EditProfile = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfile>()
  const onSubmit = async (formData: IEditProfile) => {
    try {
      const data = await axios.post(DOMEN.user.editProfile)
    } catch (e) {}
  }
  return (
    <div>
      <h1>Изменить данные профиля</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={"login"}>Логин</Label>
        <Input id={"login"} />
        <Label htmlFor={""}></Label>
        <Input id={""} />
        <Label htmlFor={""}></Label>
        <Input id={""} />
        <Label htmlFor={""}></Label>
        <Input id={""} />
        <Button>Изменить данные</Button>
      </form>
    </div>
  )
}
