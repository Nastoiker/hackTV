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
  return <div className={"mx-10 bg-white w-full"}>
    <form onSubmit={() => {}}>
      <img className={"absolute my-2 mx-4"} src={SearchIcon.src}  alt=""/>

      <Input placeholder=' поиск' className={"indent-16 "}/>
    </form>
  </div>
}
