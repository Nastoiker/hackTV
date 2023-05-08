"use client"

import { PropsWithChildren } from "react"
import { useServerInsertedHTML } from "next/navigation"
import ReduxProvider from "@/stores/provider"

type P = PropsWithChildren
export default function Providers({ children }: P) {
  // useServerInsertedHTML(() => {
  //   return <>{CssBaseline.flush()}</>;
  // });

  return (
    // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  )
}
