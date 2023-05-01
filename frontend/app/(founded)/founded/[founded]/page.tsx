"use client"

import { notFound } from "next/navigation"
import {LayoutVideo} from "@/components/Layot.video";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {NotFound} from "next/dist/client/components/error";
import {IVideo} from "@/types/Video.interface";
import {LayoutFounded} from "@/components/layout/layout.founded";
import {useEffect} from "react";
import {useAppDispatch} from "@/stores";
export interface VideoByCategory {
  id: string
  name: string
  alias: string
  firstLevelId: string
  videos: IVideo[]
}

interface PageProps {
  params: { founded: string };
}

export default  function PageFounded({ params }: PageProps) {
  const found = params?.founded;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSearch(found));
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
