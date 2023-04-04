"use client";

import { SiteHeader } from "@/components/site-header"
import ReduxProvider from "@/stores/provider";
import Providers from "@/provider/providerRedux";
import {useGetVideosQuery} from "@/stores/slices/api";
import {Video} from "@/components/video/video";
import {IVideo} from "@/types/Video.interface";
import {useCheckAuthQuery} from "@/stores/slices/regapi";

interface LayoutProps {
  children: React.ReactNode
}
export  function LayoutVideo({videos} : { videos: IVideo[];} ) {
  const {data, isLoading}  = useCheckAuthQuery({});
  if(isLoading) {

    return (
      <>
        { videos.map( (v  => <Video  video={v}/>))}
      </>
    )
  }
  // await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
  return (
    <>
       { videos.map( (v  => <Video user={data} video={v}/>))}

    </>
  )
}
