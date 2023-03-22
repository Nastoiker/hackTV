import {ICategoriesProps} from "@/components/Categoryes/ICategoriesProps";
import {CategoryButton} from "@/components/Categoryes/CategoryButton";

export const Categories = ({categories}: ICategoriesProps) => {

  return (<div>
    {categories.map( c => <CategoryButton name={c.name} alias={c.alias}/>)}
  </div>)
}
