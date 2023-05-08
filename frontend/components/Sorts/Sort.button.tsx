import { SortButtonProps } from "@/components/Sorts/sort.button.props"
import { Button } from "@/components/ui/button"

export const SortButton = ({
  className,
  sortByLike,
  sortByDate,
  ...props
}: SortButtonProps) => {
  return (
    <div className={className}>
      <Button>фильтр</Button>
    </div>
  )
}
