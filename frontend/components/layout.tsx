"use client"

import Providers from "@/provider/providerRedux"
import ReduxProvider from "@/stores/provider"

import { SiteHeader } from "@/components/site-header"

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
