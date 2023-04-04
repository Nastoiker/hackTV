"use client"
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useGetVideosQuery} from "@/stores/slices/api";
import {LayoutVideo} from "@/components/Layot.video";

export default function IndexPage() {
  const {data}  = useCheckAuthQuery({});
  const video = useGetVideosQuery({ limit: 10, offset: 0 });
  return <div>
    {
      data ? <div className={"space-y-5"}>
        <div className={"flex justify-between"}>
          <div className={"flex space-x-8"}>
            <img className={"rounded-full w-40 h-40"} width={70}  height={70} alt={'userSubs'} src={'http://localhost:8000/user' + data.avatar}/>
            <div className={"my-5"}>
              <h1>{data.login}</h1>
              <p>{data.email}</p>
            </div>
          </div>
          <div className={"text-end my-5"}><h1>Подписчки: {data.subscribers_count}</h1><h1>Лайков: {data.LikeCount}</h1></div>
        </div>
        <div>
          <Button>
            Изменить профиль
          </Button>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="video" ><h1 className={"text-white"}>Ваши видео</h1></TabsTrigger>
            <TabsTrigger value="likes" className={"text-white"}><h1 className={"text-white"}>Ваши лайки</h1></TabsTrigger>
          </TabsList>
          <TabsContent  value="video">
            <LayoutVideo videos={data.videos}/>
          </TabsContent>
          <TabsContent value="likes">
          </TabsContent>
        </Tabs>
      </div>  : <div><Button>Авторизоваться</Button></div>
    }
  </div>
}
