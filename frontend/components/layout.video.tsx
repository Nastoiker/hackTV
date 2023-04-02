"use client";

import { SiteHeader } from "@/components/site-header"
import ReduxProvider from "@/stores/provider";
import Providers from "@/provider/providerRedux";
import {useGetVideosQuery} from "@/stores/slices/api";
import {Video} from "@/components/video/video";

interface LayoutProps {
  children: React.ReactNode
}
export  function LayoutVideo() {
  const { data, isLoading, error } = useGetVideosQuery({ limit: 10, offset: 0 });
  // await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
  console.log(data);
  return (
    <>
      {
        isLoading ? <div>loading</div>:  <>{ data.map( (v  => <Video video={v}/>))}</>
      }
    </>
  )
}
