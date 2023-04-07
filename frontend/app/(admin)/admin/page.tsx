"use client"
import {useState} from "react";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {redirect} from "next/navigation";
import {useCreateCategoryMutation, useCreateSecondCategoryMutation} from "@/stores/slices/admin.api";
import '/styles/admin.css'
const PageAdmin =  () => {
  const [createCategory, Category] = useCreateCategoryMutation({});
  const [createSecond, Second] = useCreateSecondCategoryMutation({});
  const videos = useCheckAuthQuery({});
  const [value, onChange] = useState(new Date());
  //
  // if(isLoading) {
  //   return <div>loading</div>
  // }
  // if(data.role !== 'admin') {
  //   return redirect('/');
  // }
  return <div className={"mx-auto"}>ADMIN HI</div>;
}
export default PageAdmin;
