import {ITag} from "@/types/Tag.interface";
import Link from "next/link";

export const PopularTags = ({ tags }: { tags: ITag[]}) => {
  return <div className={"bg-gray border-b-brand-400"}>
    {
      tags.map( t => <Link href={t.alias} key={t.alias}>{t.name}</Link>)
    }
  </div>
}
