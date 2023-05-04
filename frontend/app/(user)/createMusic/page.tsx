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
import {useCreateMusicMutation, useCreateVideoMutation} from "@/stores/slices/user.api";
import {UpdateAvatarProfile} from "@/components/uploadImage/UploadImage";
import {ICreateMusic} from "@/types/CreateMusic.interface";
import {useMusicGetMutation} from "@/stores/slices/music.slice";
export default function IndexPage() {
  const [CreateMusic, data] = useCreateMusicMutation();
  const videoRef = useRef();
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<ICreateVideo>();

  const [file, setFile] = useState<File>();;
  };
const [music] = useMusicGetMutation();
  const onSubmit = async (formData: ICreateMusic) => {

        await CreateVideo(formData);
  }
  return <div>
    <form action="" className={"space-y-7 space-x-5 xl:flex items-center justify-around my-20"} onSubmit={handleSubmit(CreateMusic)}>
      <Label htmlFor={"name"}>Name</Label>
      <Input { ...register('name', {required: true})} id={"name"}/>


      <Label htmlFor={"alias"}>alias</Label>
      <Input { ...register('alias', {required: true})} id={"alias"}/>
      <Input { ...register('files', {required: true})} id={"file"}/>
      <Label htmlFor={"isActive"}>isActive</Label>
    </form>
  </div>
}
