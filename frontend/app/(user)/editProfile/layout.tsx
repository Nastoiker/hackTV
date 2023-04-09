import {cn} from "@/lib/utils";
import { Inter as FontSans } from "@next/font/google"
import '/styles/admin.css'
import Link from "next/link";

interface UserLayoutProps {
  children: React.ReactNode
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
export default function UserLayout({children}: UserLayoutProps) {

  return (
    <div
      className={cn(
        "  min-h-screen w-full bg-white font-sans text-slate-900 antialiased ",
        fontSans.variable
      )}
    >
      <a href={'/'}>На главную</a>
      {children}

    </div>)
}
