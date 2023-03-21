import {useState} from "react";
import {Button} from "@/components/ui/button";
import {SubscribeProps} from "@/components/Subscribe/Subscribe.props";

export const SubscribeButton = ({folow, setIsFolow}: SubscribeProps) => {
  return <div>
    {
      folow ? <Button className={"bg-red"} onClick={setIsFolow}>Подписаться</Button> : <Button className={"bg-white border-red"} onClick={setIsFolow} >Отписаться</Button>
    }

  </div>
}
