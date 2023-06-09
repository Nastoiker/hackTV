"use client"

import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useGetVideosQuery } from "@/stores/slices/api"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import { LayoutVideo } from "@/components/Layot.video"
import { LayoutMusic } from "@/components/Layout.music"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profile from "@/components/user/Profile.svg"
import Profile2 from "@/components/user/Profile2.svg"
import {useTheme} from "next-themes";

export default function IndexPage() {
  const { data } = useCheckAuthQuery({})
  const video = useGetVideosQuery({ limit: 10, offset: 0 })
  console.log(data)
  const { setTheme, theme } = useTheme();
  return (
    <div className={"w-full"}>
      {data ? (
        <div className={"space-y-5"}>
          <div className={"sm:flex sm:justify-between"}>
            <div
              className={
                " flex space-x-8 max-[638px]:justify-between max-[638px]: text-start"
              }
            >
              <img
                className={"rounded-full w-40 h-40"}
                width={70}
                height={70}
                alt={"userSubs"}
                src={
                  data.avatar?.length > 0
                    ? "http://localhost:8000/user" + data.avatar
                    : theme==='light' ? Profile.src : Profile2.src
                }/>
              <div className={"my-5"}>
                <h1>{data.login}</h1>
                <h1>{data.phone}</h1>
                <p>{data.email}</p>
              </div>
            </div>
            <div className={"px-8 sm:text-end my-5"}>
              <h1>Подписчки: {data.subscribers_count}</h1>
              <h1>Лайков: {data.LikeCount}</h1>
              <Link href={"/folows"}>Подписки: {data.following_count}</Link>
              <Button className={"block sm:hidden  w-full max-w-[100px] bg-red-500"} onClick={() => localStorage.removeItem("token")}>
                <a href={"/"}>Выйти</a>
              </Button>
            </div>
          </div>
          <div className={""}>
            <Link href={"/editProfile"}>
              <Button>Изменить профиль</Button>
            </Link>
            <Link
              className={"transition-all  p-3 rounded-md hover:bg-blue-100"}
              href={"createMusic"}
            >
              Создать музыку
            </Link>
            <Link
              className={"transition-all  p-3 rounded-md hover:bg-blue-100"}
              href={"createVideo"}
            >
              Создать видео
            </Link>
          </div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="video">
                <h1 className={"text-white"}>Ваши видео</h1>
              </TabsTrigger>
              <TabsTrigger value="likes" className={"text-white"}>
                <h1 className={"text-white"}>Ваши лайки</h1>
              </TabsTrigger>
              <TabsTrigger value="music">
                <h1 className={"text-white"}>Ваша музыка</h1>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="video">
              <LayoutVideo videos={data.videos} user={data} />
            </TabsContent>
            <TabsContent value="music">
              <LayoutMusic musics={data.music} />
            </TabsContent>
            <TabsContent value="likes">
              <LayoutVideo
                user={data}
                videos={data.Like?.map((l) => l.videos)}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div>
          <Button>Авторизоваться</Button>
        </div>
      )}
    </div>
  )
}
