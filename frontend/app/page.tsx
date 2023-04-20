"use client";
import {siteConfig} from "@/config/site";

import UserIcon from '@/public/User.svg';
import {useGetVideosQuery} from "@/stores/slices/api";

import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {LayoutVideo} from "@/components/Layot.video";
export default function IndexPage() {
  const { data, isLoading, error } = useGetVideosQuery({ limit: 10, offset: 0 });

  const user = useCheckAuthQuery({ });
  console.log(data);
  return <>
  <section className={"grid  "}>
    <div className="flex max-w-[980px] mx-auto flex-col gap-2">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Категория
      </h1>
      <div className={"ml-6"}>
        {
          (isLoading || user.isLoading ) ? <div>loading</div>  :  <LayoutVideo user={user.data}   videos={data} />
        }
      </div>
    </div>

    {/*<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-row">*/}

    {/*    GitHub*/}


    {/*</div>*/}
    {/*<div>*/}
    {/*  <p className="text-sm text-slate-500 dark:text-slate-400">*/}
    {/*    You are looking at an early preview. You can follow the progress on{" "}*/}

    {/*  </p>*/}
    {/*</div>*/}
    {/*{*/}

    {/*}*/}


  </section>
  </>
}
