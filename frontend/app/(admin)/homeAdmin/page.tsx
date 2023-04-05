"use client"
import {useState} from "react";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {redirect} from "next/navigation";

const PageAdmin =  () => {
  const {data, isLoading, isError}  = useCheckAuthQuery({});
  const [value, onChange] = useState(new Date());

  if(isLoading) {
    return <div>loading</div>
  }
  if(data.role !== 'admin') {
    return redirect('/');
  }
  return <div>ADMIN HI</div>;
}
export default PageAdmin;
