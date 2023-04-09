"use client";
import Image from "next/image";
import {VideoProps} from "@/components/video/VideoProps";
import {IVideo} from "@/types/Video.interface";
import {Button} from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
//изменить
import UserIcon from '@/public/User.svg';
import {IUser} from "@/types/User.interface";

export const SubscribeChannel = ({video, user, isSubscribe, setIsSubscribe, deleteVideo}: { video: IVideo, user?: IUser, isSubscribe: boolean ,setIsSubscribe: () => void, deleteVideo: () => void}): JSX.Element => {
  const followChannel = () => {

  }
  const unFolllowChannel = () => {

  }
  return <div className="z-10 ml-2 absolute flex justify-between my-8 w-80" onClick={setIsSubscribe}>
    {
      isSubscribe  ? <>
             <Image className={"rounded-full w-28 h-28"} width={28} height={28} alt={'userSubs'} src={video.authorVideo.avatar ?   'http://localhost:8000/user' + video.authorVideo.avatar :  UserIcon}/>

          <Button onClick={() => {}} className={"bg-red-400 "} >Отписаться</Button>
        </>

      :
        <> <div className={" bg-black bg-opacity-70  pr-3.5 rounded-3xl text-white"}>
          <HoverCard>
            <HoverCardTrigger className={"flex items-center"}>          <Image className={"rounded-full w-12 h-12"} width={50} height={50} alt={'userSubs'} src={video.authorVideo.avatar ?  'http://localhost:8000/user' +   video.authorVideo.avatar : UserIcon }/>
              <div className={" w-fit"}><h4 className={""}>{video.authorVideo.login}</h4></div>

            </HoverCardTrigger>
            <HoverCardContent>
              <p>{video.authorVideo.login}</p>
              <h1>Likes: {video.authorVideo.LikeCount}</h1>
              <p>folowers: {video.authorVideo.subscribers_count}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        {
          video.authorVideo.id === user?.id ?       <Button onClick={() => {}} className={"bg-red-500 h-12 border-red right-0"}>Удалить видео</Button>  :  <Button onClick={() => {}} className={"bg-red-500 h-12 border-red right-0"}>Подписаться</Button>
        }
        </>
    }
  </div>
}
