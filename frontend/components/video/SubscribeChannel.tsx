"use client";
import Image from "next/image";
import {VideoProps} from "@/components/video/VideoProps";
import {IVideo} from "@/types/Video.interface";
import {Button} from "@/components/ui/button";
import View from './View.svg';
//изменить
import UserIcon from '@/public/User.svg';

export const SubscribeChannel = ({video, isSubscribe, setIsSubscribe}: { video: IVideo, isSubscribe: boolean ,setIsSubscribe: () => void}): JSX.Element => {
  return <div className="z-10 mx-4 absolute flex justify-around my-8" onClick={setIsSubscribe}>
    {
      isSubscribe ? <>
          <Image width={30} alt={'userSubs'} src={video.user.avatar}/>
          <Button className={"bg-red-400 mx-64"} >Отписаться</Button>
        </>

      :
        <>  <Image width={50} height={50} alt={'userSubs'} src={video.user.avatar}/>
          <Button className={"bg-white border-red mx-36"}>Подписаться</Button>
        </>
    }
  </div>
}
