"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/stores"
import { useMusicGetQuery } from "@/stores/slices/music.slice"
import { useCreateVideoMutation } from "@/stores/slices/user.api"
import {Controller, SubmitHandler, useForm} from "react-hook-form"

import { ICreateVideo } from "@/types/CreateVideo.inerface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UpdateAvatarProfile } from "@/components/uploadImage/UploadImage"
import {SelectContent, SelectItem, Select, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CreateTags} from "@/components/forms/createVideo/createTags";
import axios from "axios";
export const CreateVideo = () => {
  const [CreateVideo, data] = useCreateVideoMutation()
  const videoRef = useRef()
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateVideo>({
    defaultValues: {
      Type: "short",
      share_url: "asd",
      embed_html: "asd",
      embed_link: "asd",
    },
  })
  const secondCategory = useAppSelector(
    (state) => state.category.category
  ).flat()
  const [file, setFile] = useState<File>()
  const [onDrag, setOnDrag] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<any>()
  const [tags, setTag] = useState<{tag: string, id: number}[]>([]);
  const handleDelete = (id) => {
    const updatedItems = tags.filter((item) => item.id !== id);
    setTag(updatedItems);
  };
  const music = useMusicGetQuery({})
  if(music.isLoading) {
    return <div>loading</div>;
  }
  const options = music.data.map((music) => ({
    value: music.id,
    label: music.name
  }));
  const handleFormKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
  };
  const uploadedFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
    console.log(file);
  }
  const onDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type !== "video/mp4") return
    setFile(file);
    uploadedFile(file);
    setOnDrag(true);
    setValue("files", file);
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()
    setOnDrag(false)
  }
  const onSubmit: SubmitHandler<ICreateVideo> = async (formData: ICreateVideo) => {
    console.log(getValues());
    console.log(tags.map( t =>  `#${t.tag}`).join(', '));
    // const filDde = formData.files[0];
    // delete formData.files;
    // formData.files = filDde;
    formData.alias = new Date().getTime().toString();
    formData.tagId= tags.map( t =>`#${t.tag}`).join(', ');
    const data = new FormData()
    const file = new Blob([formData.files], { type: 'video/mp4' });
    data.set("files", formData.files)
    data.set("name", formData.name.toString())
    data.set("alias", formData.name.toString().replace(" ", "-"))
    data.set("musicId", formData.musicId.toString())
    data.set("tagId", tags.map( t =>`#${t.tag}`).join(', ').toString())
    data.set("secondCategoryId", formData.secondCategoryId.toString())
    data.set("Description", formData.Description.toString())
    data.set("embed_link", formData.embed_link.toString())
    data.set("embed_html", formData.embed_html.toString())
    data.set("Title", formData.Title.toString())
    data.set("Type", formData.Type.toString())
    data.set("share_url", formData.share_url.toString())
    // data.append("files", new Blob([formData.files], { type: 'video/mp4' }), formData.files.name);

    console.log(data.get('files'));
    // if(!file)        { console.log(1);
    //       return;}
    // await CreateVideo(data)
    try {
      const res = await axios.post('http://localhost:8000/Video/create', { ...formData}, {
        headers: {
          Accept: 'application/json',
          "Content-Type": "multipart/form-data;",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch(e) {

    }

  }
  const colourOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ];
  return (
    <div>
      <form
        onKeyDown={handleFormKeyDown}
        className={
          "space-y-7 space-x-5 xl:flex items-center justify-around my-20"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"space-y-12  p-5"}>
          <div
            className={" outline-dashed outline-2 p-9 -outline-offset-2 w-full"}
          >
            <h1>Видео</h1>
            <div
              className={"bg-gray-200 p-9 m-9"}
              onDrop={onDrop}
              onDragOver={handleDragOver}
            >
              {onDrag ? (
                <div className={"bg-blue-200 m-9"}>
                  <img src={selectedFile} alt="Preview" />
                  <video
                    width={350}
                    height={350}
                    className={"rounded-3xl"}
                    loop
                    src={selectedFile}
                  ></video>
                </div>
              ) : (
                <div className={"m-auto"}>
                  <svg
                    width="148"
                    className={"m-auto"}
                    height="173"
                    viewBox="0 0 148 173"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M78.2432 1.7584C75.9 -0.584668 72.101 -0.584668 69.7578 1.7584L29.7578 41.7584C27.4146 44.1016 27.4146 47.9005 29.7578 50.2437C32.101 52.5868 35.9 52.5868 38.2432 50.2437L68.0005 20.4864V112.666C68.0005 115.98 70.6868 118.666 74.0005 118.666C77.3142 118.666 80.0005 115.98 80.0005 112.666V20.4864L109.759 50.2437C112.101 52.5868 115.9 52.5868 118.243 50.2437C120.587 47.9005 120.587 44.1016 118.243 41.7584L78.2432 1.7584ZM7.33317 119.333C11.015 119.333 13.9998 122.317 13.9998 126V146C13.9998 153.384 19.9418 159.333 27.2845 159.333H120.683C128.039 159.333 134 153.371 134 146V126C134 122.317 136.985 119.333 140.667 119.333C144.348 119.333 147.333 122.317 147.333 126V146C147.333 160.72 135.416 172.667 120.683 172.667H27.2845C12.5357 172.667 0.666504 160.707 0.666504 146V126C0.666504 122.317 3.6513 119.333 7.33317 119.333Z"
                      fill="black"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className={"md:flex space-x-12"}>
            <div>
              <h1>Обложка</h1>
              <UpdateAvatarProfile onSelectFile={(file) => {}} />
            </div>
          </div>
        </div>

        <div className={"space-y-6 w-1/3"}>
          <div className={"rounded-3xl bg-gray-200 space-y-5 p-5"}>
            <Label htmlFor={"name"}>Name</Label>
            <Input
              error={errors.name}
              {...register("name", {
                required: { value: true, message: "Заполните login" },
              })}
              id={"name"}
            />
            <Label htmlFor={"Title"}>Title</Label>
            <Input
              error={errors.Title}
              {...register("Title", {
                required: { value: true, message: "Заполните login" },
              })}
              id={"Title"}
            />
            {/*<Input*/}
            {/*  error={errors.files}*/}
            {/*  type={"file"}*/}
            {/*  className={"block sm:block"}*/}
            {/*  {...register("files", {*/}
            {/*    required: { value: true, message: "Заполните login" },*/}
            {/*  })}*/}
            {/*  id={"file"}*/}
            {/*/>*/}
            <Label htmlFor={"secondCategoryId"}>secondCategory</Label>

            <select
              className={"block"}
              id={"secondCategoryId"}
              {...register("secondCategoryId", {
                required: { value: true, message: "Заполните login" },
              })}
            >
              {secondCategory.map((s) =>
                s.secondLevelCategory.map((s2) => (
                  <option value={s2.id}>{s2.name}</option>
                ))
              )}
            </select>
            <Label htmlFor={"musicId"}>Выберите музыку</Label>
            <Controller
              name={"musicId"}
              control={control}
              render={({ field: { onChange, value,ref } }) => {

                return (
                  <Select  onValueChange={onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Музыка" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map(o=> <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}

                    </SelectContent>
                  </Select>
                )}}
            />
            <Label htmlFor={"tagId"}>Добавьте теги</Label>
            <CreateTags tags={tags} injectTag={(v) => setTag( (oldArr) => ([{tag: v.tag, id: tags?.length ? tags.length + 1 : 1},...oldArr]))} deleteTag={(id) => handleDelete(id)} />

            <Label htmlFor={"desc"}>Описание</Label>
            <Textarea
              className={"resize-none"}
              error={errors.Description}
              {...register("Description", {
                required: { value: true, message: "Заполните описание" },
              })}
              id={"desc"}
            />
          </div>
        </div>
        <Button onClick={(_) => console.log(getValues())} type={"submit"}>
          Создать
        </Button>
      </form>
    </div>
  )
}
