"use client"
import {Button} from "@/components/ui/button";
import {useGetVideosQuery} from "@/stores/slices/api";
import {LayoutVideo} from "@/components/Layot.video";
import Link from "next/link";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RadioGroup} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";
import {useForm} from "react-hook-form";
import {IEditProfileInterface} from "@/types/EditProfile.interface";
import {useRef, useState} from "react";
import Image from "next/image";

export default function IndexPage() {
  const {data}  = useCheckAuthQuery({});
  const [file, setFile] = useState<File>();
  const [onDrag, setOnDrag] = useState<boolean>(false);
  const picture = useRef(null);
  const [selectedFile, setSelectedFile] = useState<any>();

  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<IEditProfileInterface>();
  console.log(data);
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
  const onSubmit = async (formData: IEditProfileInterface) => {

  }
  if(!data) {
     return <div></div>;
  }
  return (
  <div className={"flex justify-around  items-center p-10 bg-blue-200 rounded-3xl mx-auto"}>
    <div onDrop={onDrop} className={""} onDragOver={handleDragOver}>
      { onDrag ? <img alt={'avatar'} className={" mx-auto rounded-full w-26 h-26"} width={100} height={100} src={selectedFile} /> :
        <div className={"space-y-5"}><img alt={'avatar'} className={" mx-auto rounded-full w-26 h-26"} width={100} height={100} src={'http://localhost:8000/user' + data.avatar} /><h1>Перенести новый файл для аватарки</h1></div> }
    </div>
    <div className={"mx-auto my-auto"}>
      <form action="" className={"space-y-7   my-12"} onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={"name"}>Name</Label>
        <Input placeholder={data.login} { ...register('login', {required: true})} id={"name"}/>
        <Label htmlFor={"phone"}>Телефон</Label>
        <Input placeholder={data.phone} { ...register('phone', {required: true})} id={"phone"}/>
        <Button className={"mx-auto"} type={"submit"}>Создать </Button>
      </form>
    </div>
  </div>)
}
