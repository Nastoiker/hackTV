"use client"
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ICreateVideo} from "@/types/CreateVideo.inerface";
import {RadioGroup} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useRef, useState} from "react";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {useCreateVideoMutation} from "@/stores/slices/user.api";
import {UpdateAvatarProfile} from "@/components/uploadImage/UploadImage";
import { useMusicGetQuery } from "@/stores/slices/music.slice";
import {useAppSelector} from "@/stores";
export default function IndexPage() {
  const [CreateVideo, data] = useCreateVideoMutation();
  const videoRef = useRef();
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ICreateVideo>();
  const secondCategory = useAppSelector(state => state.category.category).flat();
  const [file, setFile] = useState<File>();
  const [onDrag, setOnDrag] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const music = useMusicGetQuery({});

  const uploadedFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);

    };
  };
  const onDrop = (e: any) =>  {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    uploadedFile(file);
    setOnDrag(true);
  }
  const handleDragOver = (e: any) => {
    e.preventDefault();

    setOnDrag(false);
  };
  const onSubmit = async (formData: ICreateVideo) => {
    console.log(formData);
    console.log(1);
    if(!file)        { console.log(1);
      return;}
    formData.files = file;
        await CreateVideo(formData);
  }
  return <div>
    <form className={"space-y-7 space-x-5 xl:flex items-center justify-around my-20"} onSubmit={handleSubmit(onSubmit)}>
      <div className={"space-y-12  p-5"}>
          <div className={" outline-dashed outline-2 p-9 -outline-offset-2 w-full"}>
          <h1>Видео</h1>
          <div className={"bg-gray-200 p-9 m-9"} onDrop={onDrop} onDragOver={handleDragOver}>
            {
              onDrag ?
                <div className={"bg-blue-200 m-9"}>
                    <img src={selectedFile} alt="Preview" />
                  <video width={350} height={350}   className={"rounded-3xl"} loop src={selectedFile}>
                  </video>
                </div>
                :
                <div className={"m-auto"}>
                  <svg width="148" className={"m-auto"} height="173" viewBox="0 0 148 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M78.2432 1.7584C75.9 -0.584668 72.101 -0.584668 69.7578 1.7584L29.7578 41.7584C27.4146 44.1016 27.4146 47.9005 29.7578 50.2437C32.101 52.5868 35.9 52.5868 38.2432 50.2437L68.0005 20.4864V112.666C68.0005 115.98 70.6868 118.666 74.0005 118.666C77.3142 118.666 80.0005 115.98 80.0005 112.666V20.4864L109.759 50.2437C112.101 52.5868 115.9 52.5868 118.243 50.2437C120.587 47.9005 120.587 44.1016 118.243 41.7584L78.2432 1.7584ZM7.33317 119.333C11.015 119.333 13.9998 122.317 13.9998 126V146C13.9998 153.384 19.9418 159.333 27.2845 159.333H120.683C128.039 159.333 134 153.371 134 146V126C134 122.317 136.985 119.333 140.667 119.333C144.348 119.333 147.333 122.317 147.333 126V146C147.333 160.72 135.416 172.667 120.683 172.667H27.2845C12.5357 172.667 0.666504 160.707 0.666504 146V126C0.666504 122.317 3.6513 119.333 7.33317 119.333Z"
                          fill="black"/>
                  </svg>
                </div>

            }
          </div>
        </div>
        <div className={"md:flex space-x-12"}>
      <div>
        <h1>Обложка</h1>
        <UpdateAvatarProfile />

      </div>
        <div className={""}>
          <Label htmlFor={"musicId"}>Музыка</Label>
          <Input type={'file'} { ...register('musicId', {required: true})} id={"musicId"}/>

        </div>
      </div>
      </div>

      <div className={"space-y-6"}>
        <div className={"rounded-3xl bg-gray-200 space-y-5 p-5"}>
          <Label htmlFor={"name"}>Name</Label>
          <Input { ...register('name', {required: true})} id={"name"}/>
          <Input { ...register('files', {required: true})} id={"file"}/>
          <Label htmlFor={"isActive"}>isActive</Label>
          <Select  { ...register('secondCategoryId')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              {
                secondCategory.map( s =>  <SelectItem value={s.id}>{s.name}</SelectItem> )
              }
            </SelectContent>
          </Select>
          <Label htmlFor={'musicId'}>Выберите музыку</Label>
          <Select  { ...register('musicId')} name="select" >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Музыка" />
            </SelectTrigger>
            <SelectContent>
              {
                music.data && music.data.map( m =><SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)
              }
            </SelectContent>

          </Select>
          <RadioGroup { ...register('isActive', {required: true})} id={"isActive"}/>
          <Label htmlFor={"TagId"}>Tags</Label>
          <Input { ...register('secondCategoryId', {required: true})} id={"TagId"}/>
          <Label htmlFor={"secondCategoryId"}>secondCategory</Label>
          <Input />
          <Label htmlFor={"tagId"}>Name</Label>
          <Input { ...register('tagId', {required: true})} id={"tagId"}/>
          <Label htmlFor={"tagId"}>Description</Label>
          <Textarea className={"resize-none"} { ...register('description', {required: true})} id={"tagId"}/>
        </div>

      </div>
      <Button type={"submit"}>Создать</Button>
s
    </form>
  </div>
}
