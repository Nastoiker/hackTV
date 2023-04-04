"use client";
import {siteConfig} from "@/config/site";
import {Like} from "@/components/like/Like";
import {Video} from "@/components/video/video";
import {IUser} from "@/types/User.interface";
import {IVideo} from "@/types/Video.interface";
import UserIcon from '@/public/User.svg';
import {useAddVideoMutation, useDeleteVideoMutation, useGetVideosQuery} from "@/stores/slices/api";
import {LayoutVideo} from "@/components/layout.video";
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
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/stores";
import {useEffect} from "react";
import {getFirstCategory} from "@/stores/slices/category.slice";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
export default function IndexPage() {

  const { data, isLoading, error } = useGetVideosQuery({ limit: 10, offset: 0 });


  //
  // const [addVideo, { isLoading: isAdding, error: addError }] = useAddVideoMutation();
  //
  // const [deleteVideo, { isLoading: isDeleting, error: deleteError }] = useDeleteVideoMutation();
  return <>
  <section className={" grid  "}>
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Категория
      </h1>

    </div>

    {/*<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-row">*/}

    {/*    GitHub*/}


    {/*</div>*/}
    {/*<div>*/}
    {/*  <p className="text-sm text-slate-500 dark:text-slate-400">*/}
    {/*    You are looking at an early preview. You can follow the progress on{" "}*/}

    {/*  </p>*/}
    {/*</div>*/}
    {
      isLoading ? <div>loading</div>  :  <LayoutVideo  video={data} />
    }


  </section>
  </>
}
