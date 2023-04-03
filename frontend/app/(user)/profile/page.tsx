"use client"
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function IndexPage() {
  const {data}  = useCheckAuthQuery({});
  return <div>
    {
      data ? <div>
        <div className={"flex justify-between"}>
          <div className={"flex"}>
            <img className={"rounded-full w-40 h-40"} width={70}  height={70} alt={'userSubs'} src={'http://localhost:8000/user' + data.avatar}/>
            <div><h1>{data.login}</h1><p>{data.email}</p></div></div>
          <div><h1>{data.subscribers_count}</h1><h1>{data.LikeCount}</h1></div>
        </div>
        <div>
          <Button>
            Изменить профиль
          </Button>
        </div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Make changes to your account here. Click save when you&apos;re done.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Change your password here. After saving, you&apos;ll be logged out.
            </p>
          </TabsContent>
        </Tabs>
      </div>  : <div><Button>Авторизоваться</Button></div>
    }
  </div>
}
