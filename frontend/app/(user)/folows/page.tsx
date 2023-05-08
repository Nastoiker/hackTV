"use client"

import { useFollowsQuery } from "@/stores/slices/user.api"

import { Channel } from "@/components/channel/channel"

export default function Follows() {
  const { data, isLoading } = useFollowsQuery({})
  let user = ""

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div className={"flex flex-col"}>
          {data.map((f) => (
            <Channel key={f.id} user={f} />
          ))}
        </div>
      )}
    </div>
  )
}
