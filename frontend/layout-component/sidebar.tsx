import {Categories} from "@/components/Categoryes/Categories";
import {PopularTags} from "@/components/Header/PopularTags";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

export const LeftSite = ({TagsObject}) => {
  useEffect(() => {}, []);
  const [isClose, setIsOpen] = useState<boolean>(false)
  return <div className={cn("px-2 w-56 h-screen bg-white my-16 fixed z-50 border-r ", {
    ["hidden"]: isClose,
  })}>
    <Categories />
    <PopularTags tags={TagsObject} />
  </div>

}
