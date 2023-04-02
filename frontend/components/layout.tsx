"use client";

import { SiteHeader } from "@/components/site-header"
import ReduxProvider from "@/stores/provider";
import Providers from "@/provider/providerRedux";

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>

      <SiteHeader />

      <main>{children}</main>
    </>
  )
}
