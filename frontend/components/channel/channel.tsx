"use client"
import {IChannel} from "@/types/Channel.interface";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useEffect} from "react";
import {IUser} from "@/types/User.interface";

export const Channel =  ({ user }: { user: any }) => {
  return <div>
    <h1>Подписчики</h1>
    <div className={"flex space-x-5 items-center"}>
    <div className={"flex space-x-5 items-center"}>
      <img src={'http://localhost:8000/user' + user.author.avatar} className="rounded-full w-24 h-24" alt="avatarChannel"/>
      <div>
        <h1>{user.author.login}</h1>
        <p>Подписчиков: {user.author.following_count}</p>
      </div>
    </div>
    <div >
      <h1>{user.login}</h1>
      <p>{user.email}</p>
    </div>
    <div><Button onClick={() => {}}>Отписаться</Button></div>
  </div></div> ;
}
