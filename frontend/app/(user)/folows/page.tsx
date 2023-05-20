"use client"

import { useFollowsQuery } from "@/stores/slices/user.api"

import { Channel } from "@/components/channel/channel"
import {useAuthorizationQuery} from "@/stores/slices/regapi";

export default function Follows() {
  const { data, isLoading } = useFollowsQuery({})
  const  user = useAuthorizationQuery({});
  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div className={"flex flex-col"}>
          {data.map((f) => (
            <Channel key={f.id} author={f} userFollows={user.data} />
          ))}
        </div>
      )}
    </div>
  )
}
