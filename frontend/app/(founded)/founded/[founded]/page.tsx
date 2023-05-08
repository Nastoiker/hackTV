"use client"

import { useEffect } from "react"
import { NotFound } from "next/dist/client/components/error"
import { notFound } from "next/navigation"
import { useAppDispatch } from "@/stores"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import { IVideo } from "@/types/Video.interface"
import { LayoutVideo } from "@/components/Layot.video"
import { LayoutFounded } from "@/components/layout/layout.founded"

export interface VideoByCategory {
  id: string
  name: string
  alias: string
  firstLevelId: string
  videos: IVideo[]
}

interface PageProps {
  params: { founded: string }
}

export default function PageFounded({ params }: PageProps) {
  const found = params?.founded
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setSearch(found))
  }, [])
  return (
    <div className="  w-full">
      <LayoutFounded />
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          {found}
        </h1>
      </div>
    </div>
  )
}
