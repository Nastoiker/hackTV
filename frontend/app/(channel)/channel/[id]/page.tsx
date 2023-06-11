import Link from "next/link"


import { IUser } from "@/types/User.interface"

import Profile from "@/components/user/Profile.svg";
import axios from "axios";
import {LayoutVideoCheckUser} from "@/components/LayoutVideoCheckUser";
import {notFound} from "next/navigation";

interface PageProps {
  params: { id: string }
}
async function getChannel(userId): Promise<IUser | null> {
  try {
    const res = await axios.get("http://localhost:8000/user/" + userId)
    if (!res?.data) {
      return null
    }
    return await res.data;
  } catch (error) {
    return null
  }
}

export default async function PagePage({ params }: PageProps) {
  const id = params?.id
  const data = await getChannel(id);
  if (!data) notFound();
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
               src={
              data.avatar?.length > 0
                ? "http://localhost:8000/user" + data.avatar
                : Profile.src
            }
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
      <div className={"border flex flex-col  rounded-xl p-2 sm:p-10 my-10"}>
        <LayoutVideoCheckUser videos={data.videos} />
      </div>
    </div>
  )
}
