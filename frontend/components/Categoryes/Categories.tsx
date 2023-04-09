"use client"
import {ICategoriesProps} from "@/components/Categoryes/ICategoriesProps";
import {CategoryButton} from "@/components/Categoryes/CategoryButton";
import {useAppDispatch, useAppSelector} from "@/stores";
import {useEffect} from "react";
import {getFirstCategory} from "@/stores/slices/category.slice";

export const Categories = ({categories, className, ...props}: ICategoriesProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFirstCategory())
  }, [dispatch]);
  const category = useAppSelector(state => state.category.category);
  console.log(category);
  return (<div className={"space-y-5 py-5 pb-5 border-b"}>
    <h1>Категории</h1>
    {category.map( c => <CategoryButton key={c.alias} secondLevelCategory={c.secondLevelCategory} name={c.name} alias={c.alias}/>)}
  </div>)
}
