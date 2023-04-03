"use client"
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import Image from "next/image";

export default function IndexPage() {
  const {data}  = useCheckAuthQuery({});
  return <div>
    {
      data ? <div className={"flex"}><div> <img className={"rounded-full w-40 h-40"} width={70}  height={70} alt={'userSubs'} src={'http://localhost:8000/user' + data.avatar}/></div><div><h1>{data.login}</h1><p>{data.email}</p></div></div>  : <div></div>
    }

  </div>
}
