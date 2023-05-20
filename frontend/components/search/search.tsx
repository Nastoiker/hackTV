"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';import { useForm } from "react-hook-form"

import { ISearch } from "@/types/Search.interface"
import { Input } from "@/components/ui/input"
import SearchIcon from "./SearchIcon.svg"
import {useAppDispatch} from "@/stores";
import {setSearch} from "@/stores/slices/search.slice";

export const Search = () => {
  console.log(SearchIcon)
  // const onSubmit = async (formData: ISearch) => {
  //   const formData = await fetch('sadasdasd', {
  //     body: formData
  //   })
  // }
  const [searchValue, setSearchValue] = useState<string>()
  const goToSearch = () => {
    // return redirectTo('/Search/' + searchAlias);
  }
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log(searchValue)
    }
  }
  const onSubmit = () => {

  }
  const handleChange = (e: any) => {
    const search = e.target.value
    console.log(searchValue)
    setSearchValue(search)
  }
  return (
    <div className={"mx-10 w-full"}>
      <form
         onSubmit={(e) => { e.preventDefault(); dispatch(setSearch(searchValue)); router.push("/founded/" + searchValue);}}
      >
        <img
          className={"absolute my-2 mx-4"}
          src={SearchIcon.src}
          alt="searcImg"
        />

        <Input
          onChange={(e) => handleChange(e)}
          onKeyDown={() => handleKeyDown}
          placeholder=" поиск"
          className={"indent-16 bg-white "}
        />
      </form>
    </div>
  )
}
