import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Authorization = () => {
  return (
    <>
      <Button>
        {" "}
        <Link href={"authorization"} />
        Авторизоваться
      </Button>
    </>
  )
}
