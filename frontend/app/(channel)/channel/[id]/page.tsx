import { NotFound } from "next/dist/client/components/error"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import { IUser } from "@/types/User.interface"
import { LayoutVideo } from "@/components/Layot.video"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  params: { id: string }
}
async function getChannel(userId): Promise<IUser | null> {
  try {
    const res = await fetch("http://localhost:8000/user/" + userId)
    if (!res?.ok) {
      return null
    }
    return await res.json()
  } catch (error) {
    return null
  }
}

export default async function PagePage({ params }: PageProps) {
  const id = params?.id
  const data = await getChannel(id)
  if (!data) return <div>{id}</div>
  return (
    <div className={"w-full"}>
      <div className={"space-y-5"}>
        <div className={"sm:flex sm:justify-between"}>
          <div
            className={
              " flex space-x-8 max-[638px]:justify-between max-[638px]: text-end"
            }
          >
            <img
              className={"rounded-full w-40 h-40"}
              width={70}
              height={70}
              alt={"userSubs"}
              src={"http://localhost:8000/user" + data.avatar}
            />
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
          </div>
        </div>
      </div>
      <div className={"border rounded-xl p-10 my-10"}>
        <LayoutVideo videos={data.videos} user={data} />
      </div>
    </div>
  )
}
