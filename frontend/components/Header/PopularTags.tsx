import {ITag} from "@/types/Tag.interface";
import Link from "next/link";

export const PopularTags = ({ tags }: { tags: ITag[]}) => {
  return <div className={"bg-gray-400 rounded-3xl my-8 mr-4 border-4 p-4 border-brand-400"}>
    {
      tags.map( t => <Link className="bg-gray-200 rounded-3xl block my-4 px-4" href={t.alias} key={t.alias}>{t.name}</Link>)
    }
  </div>
}
