"use client"

import { ReactNode } from "react"
import { redirect, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Htag } from "@/components/Htag/Htag"

export const LayoutFounded = () => {
  const pathname = usePathname()
  const some = pathname.split("/")[2]
  console.log(some)
  return (
    <div className={"flex justify-around"}>
      <div
        onClick={() => {}}
        className={cn(
          " py-5 pointer transition-all hover:border-b-4 border-black ",
          pathname.split("/")[2] === "video" && " border-b"
        )}
      >
        <Htag type={"h1"}>Видео</Htag>
      </div>
      <div
        onClick={() => {}}
        className={cn(
          " py-5 pointer transition-all hover:border-b-4 border-black",
          pathname.split("/")[2] === "channel" && "border-b-4 border-black"
        )}
      >
        <Htag type={"h1"}>Каналы</Htag>
      </div>
      <div
        onClick={() => {}}
        className={cn(
          " py-5  pointer transition-all hover:border-b-4 border-black ",
          pathname.split("/")[2] === "Tags" && "bg-blue-200 border-b"
        )}
      >
        <Htag type={"h1"}>Теги</Htag>
      </div>
    </div>
  )
}
