import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import "@/styles/globals.css"
import UserIcon from "@/public/User.svg"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { Categories } from "@/components/Categoryes/Categories"
import { Header } from "@/components/Header/Header"
import { Search } from "@/components/search/search"

interface RootLayoutProps {
  children: React.ReactNode
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body
          className={cn(
            "max-w-screen-2xl mx-auto min-h-screen bg-white font-sans text-slate-900 antialiased ",
            fontSans.variable
          )}
        >
          <header></header>
          {children}
        </body>
      </html>
    </>
  )
}
