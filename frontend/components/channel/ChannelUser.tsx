import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import Profile from "@/components/user/Profile.svg";
import {IUser} from "@/types/User.interface";
import {api_url} from "@/domen.api";

interface IChannelUser {
  id: string,
  authorUrl: string,
  email: string,
  login: string,
  phone: string,
  isActive: boolean
  avatar: string | null
  role: 'admin' | 'user'
  subscribers_count: number
  following_count: number
  LikeCount: number,
  hisLike: number
}
export const ChannelUser = ({channel, userFollows, user}: {channel: IChannelUser, userFollows?: any, user?: any}) => {
  useEffect(() => {
    // if(userFollows) {
    //   setIsFollow( userFollows.find(f => f.id ===channel.id));
    // }
  }, []);
  const [isFollow, setIsFollow] = useState<boolean>();
  return <div>
    <div className={"flex space-x-5 items-center"}>
      <Link
        className={"flex items-center"}
        href={"/channel/" + channel.id}
      >
        <div className={"flex space-x-5 items-center"}>
          <img

            src={
              channel.avatar?.length > 0
                ? `${api_url}/user` + channel.avatar
                : Profile.src
            }
            className="rounded-full w-24 h-24"
            alt="avatarChannel"
          />
          <div>
            <h1>{channel.login}</h1>
            <p>Подписчиков: {channel.following_count}</p>
          </div>
        </div>
      </Link>
      <div>
        {
          channel.id!==user?.id &&
          <Button onClick={() => {setIsFollow((is) => !is)}}>{isFollow ? 'Отписаться' : 'Подписаться'}</Button>

        }
      </div>
    </div>
  </div>
}
