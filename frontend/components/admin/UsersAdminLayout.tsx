"use client"

import {IVideo} from "@/types/Video.interface"
import {Htag} from "@/components/Htag/Htag"
import {SortButton} from "@/components/Sorts/Sort.button"
import {UserForAdmin} from "@/components/admin/UserInfoForAdmin";
import {useBanUserMutation, useUnBanUserMutation} from "@/stores/slices/admin.api";


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

export function LayoutUserForAdmin({
                                 channels,
          sortBy='',
                               }: {
  channels: any[]
  sortBy: string,
}) {
  const [ban] = useBanUserMutation();
  const [unBanUser] =  useUnBanUserMutation();
  const handleBanUser = async (id: string) => {
    await ban(id);
  }
  const unBanUserHandle = async (id: string) => {
    await unBanUser({id});
  }
  return (
    <div className={"mx-auto flex my-5 border rounded-md p-5"}>
      <div className={"w-full flex flex-wrap gap-5  mr-20"}>
        {channels.length > 0 ? (
          channels.filter(f => f.login.includes(sortBy)).map((m) => <UserForAdmin setBanned={(id) => {handleBanUser(id)}} unban={(id)=>{unBanUserHandle(id)}} channel={m}/>)
        ) : (
          <div className={"mx-auto"}>
            <Htag type={"h1"}> Ничего не найдено</Htag>
          </div>
        )}
      </div>
      <SortButton
        className="fixed top-25 right-5 xl:right-44"
        sortByLike={() => {
        }}
        sortByDate={() => {
        }}
      />
    </div>
  )
}
