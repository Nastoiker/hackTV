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
  const [selectedFile, setSelectedFile] = useState<any>();
  const [file, setFile] = useState<File>();
  const [onDrag, setOnDrag] = useState<boolean>(false);
  const picture = useRef(null);
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
  return <div>
    <div onDrop={onDrop} onDragOver={handleDragOver}>
      onDrag ?  <div className={"bg-blue-200 m-9"}>
          <Image alt={'avatar'} width={100} height={100} src={file} />
    </div> :
      <Image alt={'avatar'} width={100} height={100} src={data.avatar}/></div>
      <form action="" className={"space-y-7 space-x-5 flex items-center justify-around my-20"} onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={"name"}>Name</Label>
        <Input { ...register('name', {required: true})} id={"name"}/>
        <Label htmlFor={"phone"}>Телефон</Label>
        <Input placeholder={data.phone} { ...register('name', {required: true})} id={"phone"}/>
        <Button className={""} type={"submit"}>Создать </Button>
    </form>
  </div>
}
