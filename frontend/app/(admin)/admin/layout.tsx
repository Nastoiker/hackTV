import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import '/styles/admin.css';
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import Head from "next/head"
import Providers from "@/provider/providerRedux"
import UserIcon from "@/public/User.svg"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { Categories } from "@/components/Categoryes/Categories"
import { Header } from "@/components/Header/Header"
import { PopularTags } from "@/components/Header/PopularTags"
import { Search } from "@/components/search/search"
import {ReactNode} from "react";

interface AdminLayoutProps {
  children: ReactNode
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (

    <div
      className={cn(
        " mx-auto  min-h-screen bg-white font-sans text-slate-900 antialiased "
      )}
    >
      {children}
    </div>

  )
}
