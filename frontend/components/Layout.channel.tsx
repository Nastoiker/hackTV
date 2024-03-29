"use client"

import {useEffect, useMemo, useState} from "react"
import {useAuthorizationQuery, useCheckAuthQuery} from "@/stores/slices/regapi"
import {useFollowsQuery} from "@/stores/slices/user.api"

import {IMusic} from "@/types/Music.interface"
import {IUser} from "@/types/User.interface"
import {IVideo} from "@/types/Video.interface"
import {Htag} from "@/components/Htag/Htag"
import {Music} from "@/components/Music/Music"
import {SortButton} from "@/components/Sorts/Sort.button"
import {Video} from "@/components/video/video"
import {Channel} from "@/components/channel/channel";
import {ChannelUser} from "@/components/channel/ChannelUser";

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

export function LayoutChannels({
                                 channels,
                               }: {
  channels: any[]
}) {
  const  user = useCheckAuthQuery({});
  return (
    <div className={"mx-auto flex"}>
      <div className={"w-full mr-20"}>
        {channels.length > 0 ? (
          channels.map((m) => <ChannelUser user={user.data && user.data} channel={m}/>)
        ) : (
          <div className={"mx-auto"}>
            <Htag type={"h1"}> Ничего не найдено</Htag>
          </div>
        )}
      </div>
      <SortButton
        className=" top-25 right-5 xl:right-44"
        sortByLike={() => {
        }}
        sortByDate={() => {
        }}
      />
    </div>
  )
}
