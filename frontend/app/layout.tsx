import {cn} from "@/lib/utils";
import { Inter as FontSans } from "@next/font/google"
import {ThemeProvider} from "next-themes";
import {SiteHeader} from "@/components/site-header";
import "@/styles/globals.css"
import {Search} from "@/components/search/search";
import {Header} from "@/components/Header/Header";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (<>
    <html lang="en" >
    <head />
    <body
      className={cn(
        "max-w-screen-2xl mx-auto min-h-screen bg-white font-sans text-slate-900 antialiased ",
        fontSans.variable
      )}
    >
    <header>
      <Header user={false} setIsLogin={() => '' } setIsLogout={() => ''} />
    </header>
    {children}
    </body>
    </html></>)
}
