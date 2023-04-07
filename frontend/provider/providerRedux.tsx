"use client";
import {useServerInsertedHTML} from "next/navigation";
import ReduxProvider from "@/stores/provider";
import {PropsWithChildren} from "react";
type P = PropsWithChildren;
export default function Providers({ children }: P) {
  // useServerInsertedHTML(() => {
  //   return <>{CssBaseline.flush()}</>;
  // });

  return ( // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </>
  );
}
