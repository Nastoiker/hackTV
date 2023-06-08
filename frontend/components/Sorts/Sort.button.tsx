import { SortButtonProps } from "@/components/Sorts/sort.button.props"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {cn} from "@/lib/utils";

export const SortButton = ({
  className,
  sortByLike,
  sortByDate,
  ...props
}: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrenFilter] = useState<string>('');
  return (
    <div className={className}>
        <Button className={'mr-0 w-full'} onClick={ () => setIsOpen((o) => !o)}>фильтр</Button>
      {
        isOpen &&
        <div className={"space-y-5 py-5 px-2 border rounded-md"}>
          <button  className={cn("block hover:border-b-2 transition-all", currentFilter === "users" && "border-b-4 border-black")} onClick={() => { setIsOpen(false); sortByLike()}}>по Дате </button>
          <button className="block hover:border-b-2 transition-all duration-75"  onClick={() => { setIsOpen(false);sortByDate()}} >по Лайкам </button>
        </div>
      }

    </div>
  )
}
