"use client"

import {ChangeEvent, useEffect, useRef, useState} from "react"
import Image from "next/image"
import { useAppSelector } from "@/stores"
import { useMusicGetQuery } from "@/stores/slices/music.slice"
import {useCreateMusicMutation, useCreateVideoMutation} from "@/stores/slices/user.api"
import { useForm } from "react-hook-form"

import { ICreateVideo } from "@/types/CreateVideo.inerface"
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
import { UpdateAvatarProfile } from "@/components/uploadImage/UploadImage"
import {Htag} from "@/components/Htag/Htag";
import Profile from "@/components/user/Profile.svg";
import {ICreateMusic} from "@/types/CreateMusic.interface";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {IState} from "@/components/forms/createVideo/createVideo";

export const CreateMusicComponent = () => {
  const [CreateMusic, data] = useCreateMusicMutation()
  const videoRef = useRef();
  const [file, setFilePicture] = useState<File>();
  const [musicFile, setMusicFile] = useState<File>();
  const [musicCreate, setMusicCreate] = useState<File>();
  const [onDrag, setOnDrag] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<any>()
  const [state, setState] = useState<IState>({ loading: false, error: false, success: false });

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateMusic>({});

  const uploadedFileMusic = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
    setMusicFile(file);
    const audioEl = new Audio(URL.createObjectURL(file));
    setAudio(audioEl);
  }
  const onDropPicture = (file: any) => {
    // if (file.type !== "music/mp3") return
    setValue("picture", file);
    setOnDrag(true);
  }
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const onDropMusic = (e: any) => {
    e.preventDefault();
    setValue("music", e.dataTransfer.files[0]);
    const file = e.dataTransfer.files[0]
    console.log(file.type);
    if (file.type !== "audio/mpeg") return;

    uploadedFileMusic(file)
    setOnDrag(true)
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()

    setOnDrag(false)
  }
  useEffect(() => {
    const audioEl = new Audio()
    audioEl.addEventListener("ended", () => {
      setIsPlaying(false)
    })
    setAudio(audioEl)
    return () => audioEl.pause();
  }, [])
  const [volume, setVolume] = useState(1) // начальный уровень громкости
  const handlePlayPause = () => {
    if (!audio){ console.log('niot'); return;}
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }
  const handleInputMusic = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    uploadedFileMusic(file)
    setOnDrag(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {

    }
    setValue("music", file);
  }


  const onSubmit = async (formData: ICreateMusic) => {
    //нужный кастыль
    // if(!file)        { console.log(1);
    //       return;}
    const data = new FormData();
    data.set("music", formData.music);
    data.set("picture", formData.picture);
    data.set("name", formData.name.toString())
    data.set("alias", formData.alias.toString().replace(" ", "-"))
    setState({error: false, loading: true, success: false});
    await CreateMusic(data);
    setState({...state, loading: false, success: true});
  }
  return (
    <div>
      <form
        className={
          "space-y-7 space-x-5 xl:flex items-center justify-around my-20"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"space-y-12  p-5"}>
          <div
            className={" outline-dashed outline-2 p-9 -outline-offset-2 w-full"}
          >
            <h1>музыка</h1>
            <div
              className={"bg-gray-200 p-9 m-9"}
              onDrop={onDropMusic}
              onDragOver={handleDragOver}
            >
              { musicFile ? (
                <div className={"bg-blue-200 m-9"}>
                  <Button type={'button'} onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
                </div>
              ) : (
                <div className={"m-auto"}>
                  <label htmlFor={'musicFileId'}>
                    <svg
                      width="50"
                      className={"m-auto"}
                      height="50"
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
                    <input onChange={(e) => handleInputMusic(e)} type={'file'} className={'hidden'} accept={'audio/*'} id={'musicFileId'}/>
                  </label>

                </div>
              )}
            </div>
          </div>
          <div className={"md:flex space-x-12"}>
            <div>
              <h1>Обложка</h1>
              <UpdateAvatarProfile onSelectFile={(e) => onDropPicture(e)}/>
            </div>
          </div>
        </div>

        <div className={"space-y-6"}>
          <div className={"rounded-3xl border space-y-5 p-5"}>
            <Label htmlFor={"name"}>Name</Label>

            <Input
              error={errors.name}
              {...register("name", {
                required: { value: true, message: "Заполните login" },
              })}
              id={"name"}
            />
            <Label htmlFor={"alias"}>Alias</Label>
            <Input
              error={errors.name}
              {...register("alias", {
                required: { value: true, message: "Заполните login" },
              })}
              id={"alias"}
            />
            <Button onClick={(_) => console.log(getValues())} type={"submit"}>
              Создать
            </Button>
          </div>

        </div>

      </form>
      {state.loading &&
        <div className="flex my-10 items-center text-4xl">Видео загружается <svg
          className="animate-spin  mx-3 h-16 w-16 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentcolor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentcolor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg></div>
      }
      {
        state.success && <Alert>
          <AlertTitle>Успешно</AlertTitle>
          <AlertDescription>
            Вы создали видео
          </AlertDescription>
        </Alert>

      }
      {
        state.error && <h1>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ошибка создания видео
            </AlertDescription>
          </Alert>
        </h1>

      }
    </div>
  )
}
