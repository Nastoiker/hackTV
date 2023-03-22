"use client"
import {useState} from "react";
import Calendar from "react-calendar";

const PageAdmin = () => {
  const [value, onChange] = useState(new Date());
  return <Calendar onChange={onChange} value={value} />;
}
export default PageAdmin;
