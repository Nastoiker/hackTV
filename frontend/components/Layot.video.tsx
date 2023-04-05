"use client";

import { SiteHeader } from "@/components/site-header"
import ReduxProvider from "@/stores/provider";
import Providers from "@/provider/providerRedux";
import {useGetVideosQuery} from "@/stores/slices/api";
import {Video} from "@/components/video/video";
import {IVideo} from "@/types/Video.interface";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {IUser} from "@/types/User.interface";

interface LayoutProps {
  children: React.ReactNode
}
export  function LayoutVideo({videos, user} : { videos: IVideo[], user?: IUser;} ) {
  // await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
  console.log(videos);
  return (
    <div className={"mx-auto"}>
       { videos.map( (v  => <Video user={user} video={v}/>))}
    </div>
  )
}