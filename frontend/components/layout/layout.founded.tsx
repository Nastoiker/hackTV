import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Htag} from "@/components/Htag/Htag";

export const LayoutFounded = () => {
  const pathname = usePathname();
  const some =  pathname.split('/')[2];
  return  <div className={"flex justify-around"}>
    <div className={cn("rounded-3xl p-10", pathname.split('/')[2] === 'video' && "bg-blue-200")}>
      <Htag type={'h1'}>Видео</Htag>
    </div>
    <div className={cn("rounded-3xl p-10", pathname.split('/')[2] === 'video' && "bg-blue-200")}>
      <Htag type={'h1'}>Каналы</Htag>
    </div>
    <div className={cn("rounded-3xl p-10", pathname.split('/')[2] === 'video' && "bg-blue-200")}>
      <Htag type={'h1'}>Теги</Htag>
    </div>
  </div>;
}
