"use client"
import {ISearch} from "@/types/Search.interface";
import {useForm} from "react-hook-form";

export const Search = () => {
  const onSubmit = async (formData: ISearch) => {

  }
  return <div className={" bg-white w-full"}>
    <form onSubmit={onSubmit()}>

    </form>
  </div>
}
