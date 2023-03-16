"use client"
import {ISearch} from "@/types/Search.interface";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import   SearchIcon    from './SearchIcon.svg';
export const Search = () => {
  console.log(SearchIcon);
  // const onSubmit = async (formData: ISearch) => {
  //   const formData = await fetch('sadasdasd', {
  //     body: formData
  //   })
  // }
  return <div className={" bg-white w-full"}>
    <form onSubmit={() => {}}>
      <img className={"absolute my-2"} src={SearchIcon.src}  alt=""/>

      <Input placeholder='         поиск'/>
    </form>
  </div>
}
