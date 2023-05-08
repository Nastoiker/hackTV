import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Registration = () => {
  return (
    <>
      <Button>
        <Link href={"registration"} /> Регистрация
      </Button>
    </>
  )
}
