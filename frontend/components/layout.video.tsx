"use client";

import { SiteHeader } from "@/components/site-header"
import ReduxProvider from "@/stores/provider";
import Providers from "@/provider/providerRedux";
import {useGetVideosQuery} from "@/stores/slices/api";
import {Video} from "@/components/video/video";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {IUser} from "@/types/User.interface";

interface LayoutProps {
  video: any;
}
export  function asdasdsad({video, user}: LayoutProps) {
  // await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
  return (
    <>
       { video.map( (v  => <Video  video={v}/>))}

    </>
  )
}
