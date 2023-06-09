"use client"
import { NotFound } from "next/dist/client/components/error"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import { IUser } from "@/types/User.interface"
import { LayoutVideo } from "@/components/Layot.video"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profile from "@/components/user/Profile.svg";
import {useAppDispatch, useAppSelector} from "@/stores";
import {useEffect} from "react";
import {searchVideoByTag} from "@/stores/slices/tag.slice";

interface PageProps {
  params: { tagId: string }
}

export default  function PagePage({ params }: PageProps) {
  const id = params.tagId;
  const dispatch = useAppDispatch();

  const tag = useAppSelector(state=>state.tag.search);
  useEffect(() => {
    dispatch(searchVideoByTag(tag));
  },[]);
  const videos = useAppSelector(state=> state.tag.videos);
  if(!videos) {
    notFound();
  }
  return (
    <div className={"w-full"}>
      <h1>
        {tag}
      </h1>
      <LayoutVideo videos={ videos}  />
    </div>
  )
}
