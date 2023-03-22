import {ICategoriesProps} from "@/components/Categoryes/ICategoriesProps";
import {CategoryButton} from "@/components/Categoryes/CategoryButton";

export const Categories = ({categories, className, ...props}: ICategoriesProps) => {

  return (<div className={"space-y-5 pb-5 border-b "}>
    <h1>Категории</h1>
    {categories.map( c => <CategoryButton name={c.name} alias={c.alias}/>)}
  </div>)
}
