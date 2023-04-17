"use client"
import {IChannel} from "@/types/Channel.interface";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useEffect} from "react";
import {IUser} from "@/types/User.interface";
import Link from "next/link";

export const Channel =  ({ user }: { user: any }) => {
  return <div>
    <h1>Подписчики</h1>
    <div className={"flex space-x-5 items-center"}>
      <Link className={"flex items-center"} href={'/channel/' + user.author.id}>
        <div className={"flex space-x-5 items-center"}>
          <img src={'http://localhost:8000/user' + user.author.avatar} className="rounded-full w-24 h-24" alt="avatarChannel"/>
          <div>
            <h1>{user.author.login}</h1>
            <p>Подписчиков: {user.author.following_count}</p>
          </div>
        </div>

      </Link>
      <div>
        <Button onClick={() => {}}>Отписаться</Button>
      </div>
  </div>
  </div> ;
}
