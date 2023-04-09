import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LayoutVideo} from "@/components/Layot.video";

export default function Page({
                               params,
                               searchParams,
                             }: {
  params: { id: string; };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return  return <div>
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
        <div className={""}>
          <Button onClick={() => redirect('/editProfile')}>
            Изменить профиль
          </Button>
          <Link className={"transition-all  p-3 rounded-md hover:bg-blue-100"} href={'createVideo'}>
            Создать видео
          </Link>
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
            <LayoutVideo videos={data.Like.map(l => l.videos)}/>
          </TabsContent>
        </Tabs>
      </div>  : <div><Button>Авторизоваться</Button></div>
    }
  </div>
}
