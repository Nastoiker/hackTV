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
      <Button onClick={ () => setIsOpen((o) => !o)}>фильтр</Button>
      {
        isOpen &&
        <div className={""}>
          <button  className={cn("block", currentFilter === "users" && "border-b-4 border-black")} onClick={() => { setIsOpen(false); sortByLike()}}>Сортировка по дате </button>
          <button className="block"  onClick={() => { setIsOpen(false);sortByDate()}} >Сортировка по Лайкам </button>
        </div>
      }

    </div>
  )
}
