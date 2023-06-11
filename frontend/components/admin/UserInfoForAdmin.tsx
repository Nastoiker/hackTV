import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import Profile from "@/components/user/Profile.svg";
import {IUser} from "@/types/User.interface";

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
export const UserForAdmin = ({channel, setBanned, unban}: {channel: any, setBanned: (id: string) => void, unban: (id: string) => void}) => {
    const [isActive, setIsActive] = useState<boolean>(channel.isActive)
    const handleBan = () => {
    if(isActive) {
      unban(channel.id);
      setIsActive(false);
    } else {
      setBanned(channel.id);
      setIsActive(true);
    }
  }
  return <div>
    <div className={"flex space-x-5 items-center"}>
      <div>
        <Link
          className={"flex items-center"}
          href={"/channel/" + channel.id}
        >
          <div className={"flex space-x-5 items-center"}>
            <img

              src={
                channel.avatar?.length > 0
                  ? "http://localhost:8000/user" + channel.avatar
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
          <h1>Доп Инф.</h1>
          <p>
            {channel.email}
          </p>
          <p>
            {channel.id}
          </p>
          <p>
            {channel.role}
          </p>
          <Button onClick={() => handleBan()}>{ isActive ? 'Забанить' : 'Разбанить'}</Button>
        </div>
      </div>

      <div>

      </div>
    </div>
  </div>
}
