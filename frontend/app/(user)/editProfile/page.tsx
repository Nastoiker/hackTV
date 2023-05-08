"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useGetVideosQuery } from "@/stores/slices/api"
import { useCheckAuthQuery } from "@/stores/slices/regapi"
import { useEditProfileMutation } from "@/stores/slices/user.api"
import { scaleDiverging } from "d3-scale"
import { useForm } from "react-hook-form"

import { IEditProfileInterface } from "@/types/EditProfile.interface"
import { LayoutVideo } from "@/components/Layot.video"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Profile from "@/components/user/Profile.svg"

export default function IndexPage() {
  const { data, isLoading } = useCheckAuthQuery({})
  const [file, setFile] = useState<File>()
  const [editProfile] = useEditProfileMutation()
  const [onDrag, setOnDrag] = useState<boolean>(false)
  const picture = useRef(null)
  const [selectedFile, setSelectedFile] = useState<any>()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditProfileInterface>()
  console.log(data)
  const uploadedFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
  }
  const onDrop = (e: any) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setFile(file)
    uploadedFile(file)
    setOnDrag(true)
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()

    setOnDrag(false)
  }
  const onSubmit = async (formData: IEditProfileInterface) => {
    const edited = await editProfile(formData)
  }
  return (
    <div className={"w-full"}>
      {" "}
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div
          className={
            "flex text-white justify-around  items-center p-10 bg-blue-200 rounded-3xl mx-auto"
          }
        >
          <div onDrop={onDrop} className={""} onDragOver={handleDragOver}>
            {onDrag ? (
              <img
                alt={"avatar"}
                className={" mx-auto rounded-full w-26 h-26"}
                width={100}
                height={100}
                src={selectedFile}
              />
            ) : (
              <div className={"space-y-5 my-5 p-5  outline-dashed border-4"}>
                <img
                  alt={"avatar"}
                  className={" mx-auto rounded-full w-26 h-26"}
                  width={100}
                  height={100}
                  src={
                    data?.avatar?.length > 0
                      ? "http://localhost:8000/user" + data?.avatar
                      : Profile.src
                  }
                />
                <h1 className={"font-bold"}>
                  Перенести новый файл для аватарки
                </h1>
              </div>
            )}
            {onDrag && (
              <Button className="mx-auto " onClick={() => setOnDrag(false)}>
                Отменить
              </Button>
            )}
          </div>
          <div className={"mx-auto my-auto"}>
            <form
              action=""
              className={"space-y-7   my-12"}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label className={"font-bold"} htmlFor={"name"}>
                Name
              </Label>
              <Input
                placeholder={data.login}
                {...register("login", { required: true })}
                id={"name"}
              />
              <Label className={"font-bold"} htmlFor={"password"}>
                password
              </Label>
              <Input
                placeholder={data.password}
                {...register("password", { required: true })}
                id={"name"}
              />
              <Label className={"font-bold"} htmlFor={"oldPassword"}>
                oldPassword
              </Label>
              <Input
                placeholder={data.oldPassword}
                {...register("oldPassword", { required: true })}
                id={"name"}
              />
              <Label className={"font-bold"} htmlFor={"'phone'"}>
                phone
              </Label>

              <Input
                placeholder={data.phone}
                {...register("phone", { required: true })}
                id={"phone"}
              />
              <Button className={"mx-auto"} type={"submit"}>
                Изменить{" "}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
