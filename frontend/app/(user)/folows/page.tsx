"use client";

import {Channel} from "@/components/channel/channel";

import {useFollowsQuery} from "@/stores/slices/user.api";

export default   function  Follows() {
  const {data, isLoading} = useFollowsQuery({});
  let user = '';


  return <div>
    {isLoading ?
      <div></div>
       : <div className={"flex flex-col"}>
        {
          data.map(  (f) =><Channel key={f.id} user={f}/> )
        }
      </div>}
  </div>
}
