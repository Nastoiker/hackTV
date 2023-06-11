import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import '/styles/admin.css';
import { cn } from "@/lib/utils"

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
        " mx-auto MainMargin  min-h-screen   font-sans  antialiased "
      )}
    >
      {children}
    </div>

  )
}
