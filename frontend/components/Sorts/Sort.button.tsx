import { SortButtonProps } from "@/components/Sorts/sort.button.props"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {cn} from "@/lib/utils";
import './sort.module.css';
export const SortButton = ({
  className,
  sortByLike,
  sortByDate,
  ...props
}: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrenFilter] = useState<string>('');
  return (
    <div className={cn(className, 'absolute')}>
        <Button className={'mr-0 w-full -mt-10'} onClick={ () => setIsOpen((o) => !o)}>
          <svg xmlns="http://www.w3.org/2000/svg"  width="34" fill="currentcolor" viewBox="0 0 24 24"><path d="M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z"></path></svg></Button>
      {
        isOpen &&
        <div className={"space-y-5 relative VisibleSort z-50 py-5 px-2 bg-background border  rounded-md"}>
          <button  className={cn("block VisibleSort hover:border-b-2 transition-all", currentFilter === "users" && "border-b-4 border-black")} onClick={() => { setIsOpen(false); sortByDate()}}>по Дате </button>
          <button className="block VisibleSort  hover:border-b-2 transition-all duration-75"  onClick={() => { setIsOpen(false); sortByLike()}} >по Лайкам </button>
        </div>
      }

    </div>
  )
}
