"use client"

import Link from "next/link"
import { useTagsQuery } from "@/stores/slices/api"

import { ITag } from "@/types/Tag.interface"
import {useAppDispatch} from "@/stores";
import {setTag} from "@/stores/slices/tag.slice";

export const PopularTags = () => {
  const { data, isLoading } = useTagsQuery({ limit: 8 })
  const dispatch = useAppDispatch();
  console.log(data);
  if (!data) return <div></div>
  const handleTag = (value) => {
    dispatch(setTag(value));
  }
  return (
    <div
      className={
        "rounded-2xl my-8  bg-background  mr-4 border-4 p-4 border-gray-400"
      }
    >
      {data.slice(0, 8).map((t) => {
        const link = t.name.replace('#', '');
        return (
        <Link
          className="hover:bg-opacity-70 border rounded-3xl block my-4 px-4"
          href={`/tags/${link}`.replace(' ', '')}
          onClick={() => handleTag(link.replace(' ', ''))}
          key={t.id}
        >
          {t.name}
        </Link>
        )})}
    </div>
  )
}
