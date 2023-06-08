"use client"

import { ReactNode } from "react"
import { redirect, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Htag } from "@/components/Htag/Htag"

export const LayoutFounded = ({ active, setActiveFounded}: { active: string, setActiveFounded: (value: string) => void}) => {
  const pathname = usePathname()
  const some = pathname.split("/")[2]
  console.log(some)
  return (
    <div className={"p-2 sm:flex justify-around"}>
      <div
        onClick={() => {setActiveFounded('video')}}
        className={cn(
          " py-5 pointer transition-all hover:border-b-4",
          active === "video" && " border-b-4"
        )}
      >
        <Htag type={"h1"}>Видео</Htag>
      </div>
      <div
        onClick={() => {setActiveFounded('channels')}}
        className={cn(
          " py-5 pointer transition-all hover:border-b-4 ",
          active === "channels" && "border-b-4"
        )}
      >
        <Htag type={"h1"}>Каналы</Htag>
      </div>
      <div
        onClick={() => {setActiveFounded('tags')}}
        className={cn(
          " py-5  pointer transition-all hover:border-b-4  ",
          active === "tags" && "border-b-4"
        )}
      >
        <Htag type={"h1"}>Теги</Htag>
      </div>
       <div
        onClick={() => {setActiveFounded('musics')}}
        className={cn(
          " py-5  pointer transition-all hover:border-b-4 ",
          active === "musics" && "border-b-4"
        )}
      >
        <Htag type={"h1"}>Музыка</Htag>
      </div>
    </div>
  )
}
