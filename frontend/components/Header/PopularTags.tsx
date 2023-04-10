"use client";
import {ITag} from "@/types/Tag.interface";
import Link from "next/link";
import {useTagsQuery} from "@/stores/slices/api";

export const PopularTags = () => {
  const {data, isLoading} = useTagsQuery({ limit: 10})
  console.log(data);
  if(!data) return <div></div>
  return <div className={"bg-gray-200 rounded-3xl my-8 mr-4 border-4 p-4 border-gray-400"}>
    {
      data.map( t => <Link className="hover:bg-opacity-70 bg-gray-300 rounded-3xl block my-4 px-4" href={t.name} key={t.id}>{t.name}</Link>)
    }
  </div>
}
