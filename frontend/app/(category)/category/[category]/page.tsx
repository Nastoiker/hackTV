import { NotFound } from "next/dist/client/components/error"
import { notFound } from "next/navigation"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import { IVideo } from "@/types/Video.interface"
import { LayoutVideo } from "@/components/Layot.video"
import {LayoutVideoCategory} from "@/components/Layout.category";

export interface VideoByCategory {
  id: string
  name: string
  alias: string
  firstLevelId: string
  videos: IVideo[]
}

interface PageProps {
  params: { category: string }
}
async function getCategory(alias): Promise<VideoByCategory | null> {
  try {
    const res = await fetch("http://localhost:8000/Video/category/:" + alias)
    if (!res?.ok) {
      return null
    }
    console.log(res)

    return await res.json()
  } catch (e) {
    return null
  }
}

export default async function PageCategory({ params }: PageProps) {
  const slug = params?.category
  if (!slug) {
    return <div></div>
  }
  const videos = await getCategory(slug)
  if (!videos) return <div>{slug}</div>

  const result = videos.videos;
  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          {slug}
        </h1>
          <LayoutVideoCategory videos={result} />
      </div>
      <hr className="my-4 border-slate-200" />
    </article>
  )
}
