import { useState } from "react"

import { SubscribeProps } from "@/components/Subscribe/Subscribe.props"
import { Button } from "@/components/ui/button"

export const SubscribeButton = ({ folow, setIsFolow }: SubscribeProps) => {
  return (
    <div>
      {folow ? (
        <Button className={"bg-red"} onClick={setIsFolow}>
          Подписаться
        </Button>
      ) : (
        <Button className={"bg-white border-red"} onClick={setIsFolow}>
          Отписаться
        </Button>
      )}
    </div>
  )
}
