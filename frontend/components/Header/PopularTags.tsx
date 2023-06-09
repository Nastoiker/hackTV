"use client"

import Link from "next/link"
import { useTagsQuery } from "@/stores/slices/api"

import { ITag } from "@/types/Tag.interface"
import {useAppDispatch} from "@/stores";
import {setTag} from "@/stores/slices/tag.slice";

export const PopularTags = () => {
  const { data, isLoading } = useTagsQuery({ limit: 10 })
  const dispatch = useAppDispatch();
  console.log(data);
  if (!data) return <div></div>
  const handleTag = (value) => {
    dispatch(setTag(value));
  }
  return (
    <div
      className={
        "bg-gray-200 rounded-3xl my-8 mr-4 border-4 p-4 border-gray-400"
      }
    >
      {data.map((t) => {
        const link = t.name.replace('#', '');
        return (
        <Link
          className="hover:bg-opacity-70 bg-background rounded-3xl block my-4 px-4"
          href={`/tags/${link}`.replace(' ', '')}
          onClick={() => handleTag(link)}
          key={t.id}
        >
          {t.name}
        </Link>
        )})}
    </div>
  )
}
