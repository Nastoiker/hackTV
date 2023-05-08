"use client"

import { useMemo, useState } from "react"
import { useCheckAuthQuery } from "@/stores/slices/regapi"
import { useFollowsQuery } from "@/stores/slices/user.api"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { Htag } from "@/components/Htag/Htag"
import { SortButton } from "@/components/Sorts/Sort.button"
import { Video } from "@/components/video/video"

interface LayoutProps {
  children: React.ReactNode
}
function FilterByDate(videos) {
  const sort = [...videos]
  const sortByTime = sort?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  return sortByTime
}
function FilterByLike(videos: IVideo[]) {
  const sort = [...videos]
  const sortByTime = sort?.sort((a, b) => a.likesCount - b.likesCount)
  return sortByTime
}
function FilterBySubs(videos: IVideo[]) {
  const sort = [...videos]
  const sortByTime = sort?.sort(
    (a, b) => a.authorVideo.subscribers_count - b.authorVideo.subscribers_count
  )
  return sortByTime
}
export function LayoutVideo({
  videos,
  user,
}: {
  videos: IVideo[]
  user?: IUser
}) {
  const follow = useFollowsQuery({})
  const [activeVideo, setActiveVideo] = useState(null)
  const [commentsVisible, setCommentsVisible] = useState({})

  const handlePlay = (videoId) => {
    setActiveVideo(videoId)
  }

  const handlePause = (videoId) => {
    if (activeVideo === videoId) {
      setActiveVideo(null)
    }
  }

  const handleToggleComments = (videoId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }))
  }

  const isCommentsVisible = (videoId) => {
    return Boolean(commentsVisible[videoId])
  }
  console.log(videos)
  const filterByDate = useMemo(() => FilterByDate(videos), [videos])
  const filterByLike = useMemo(() => FilterByLike(videos), [videos])
  const filterBySubs = useMemo(() => FilterBySubs(videos), [videos])
  // const user = useCheckAuthQuery({})
  return (
    <div className={"mx-auto flex"}>
      <div>
        {videos.length > 0 ? (
          videos.map((v) => <Video key={v.id} user={user && user} video={v} />)
        ) : (
          <div className={"mx-auto"}>
            <Htag type={"h1"}> Ничего не найдено</Htag>
          </div>
        )}
      </div>
      <SortButton
        className="fixed top-18 right-5 xl:right-44"
        sortByLike={() => {}}
        sortByDate={() => {}}
      />
    </div>
  )
}
