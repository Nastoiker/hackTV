"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import axios from "axios"

import { IChannel } from "@/types/Channel.interface"
import { IUser } from "@/types/User.interface"
import { Button } from "@/components/ui/button"
import {useFollowChannelMutation, useUnfollowChannelMutation} from "@/stores/slices/user.api";
import {useAuthorizationQuery} from "@/stores/slices/regapi";
import Profile from "@/components/user/Profile.svg";

export const Channel = ({ userFollows, author }: { userFollows?: any, author: any }) => {
  const [followChannel ] = useFollowChannelMutation();
  const [unfollowChannel] = useUnfollowChannelMutation();
  const {isLoading, data} = useAuthorizationQuery({});
  useEffect(() => {
    if(userFollows) {
      setIsFollow( userFollows.find(f => f.id ===author));
    }
  }, []);
  const [isFollow, setIsFollow] = useState<boolean>();
  return (
    <div>
      <h1>Подписчики</h1>
      <div className={"flex space-x-5 items-center"}>
        <Link
          className={"flex items-center"}
          href={"/channel/" + author.author.id}
        >
          <div className={"flex space-x-5 items-center"}>
            <img
              src={
                author.author.avatar?.length > 0
                  ? "http://localhost:8000/user" + author.author.avatar
                  : Profile.src
              }
              className="rounded-full w-24 h-24"
              alt="avatarChannel"
            />
            <div>
              <h1>{author.author.login}</h1>
              <p>Подписчиков: {author.author.following_count}</p>
            </div>
          </div>
        </Link>
        <div>
          <Button onClick={() => {setIsFollow((is) => !is)}}>{isFollow ? 'Отписаться' : 'Подписаться'}</Button>
        </div>
      </div>
    </div>
  )
}
