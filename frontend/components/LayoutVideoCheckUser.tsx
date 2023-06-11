"use client"
import {IVideo} from "@/types/Video.interface";
import {IUser} from "@/types/User.interface";
import {LayoutVideo} from "@/components/Layot.video";
import {useCheckAuthQuery} from "@/stores/slices/regapi";

export function LayoutVideoCheckUser({
                              videos,
                            }: {
  videos: IVideo[]
}) {
  const {data, error, isLoading} = useCheckAuthQuery({});
  return <>
   <LayoutVideo videos={videos} user={(!error && !isLoading) && data} />
  </>
}
