import {cn} from "@/lib/utils";
import { Inter as FontSans } from "@next/font/google"
import {ThemeProvider} from "next-themes";
import {SiteHeader} from "@/components/site-header";
import "@/styles/globals.css"
import {Search} from "@/components/search/search";
import {Header} from "@/components/Header/Header";
import {IVideo} from "@/types/Video.interface";
import {IUser} from "@/types/User.interface";
import UserIcon from "@/public/User.svg";
import {Categories} from "@/components/Categoryes/Categories";
import Head from 'next/head';
import Providers from "@/provider/providerRedux";
import {PopularTags} from "@/components/Header/PopularTags";
import '/styles/admin.css'
import {usePathname} from "next/navigation";
import {LayoutFounded} from "@/components/layout/layout.founded";

interface AdminLayoutProps {
  children: React.ReactNode
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
export default function LayotSearch({children}: AdminLayoutProps) {

  return (
    <div>
      <LayoutFounded />
      {children}
    </div>)
}
