"use client"
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
import {PopularTags} from "@/components/Header/PopularTags";
import {useState} from "react";
import Providers from "@/provider/providerRedux";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

interface RootLayoutProps {
  children: React.ReactNode
}
const User: IUser = {
  id: '1',
  authorUrl: 'string',
  email: 'damur@gmail.com',
  login: 'idiot',
  avatar: UserIcon.src,
}
const TagsObject = [{name: 'js', alias: 'js'}, {name: 'js', alias: 'js'}];
const categoriesOb = [{ name: 'Popular', alias: 'Popular'}, { name: 'Poasdasdasdasdpular', alias: 'Popular'}, { name: 'Popular', alias: 'Popular'}, { name: 'Popular', alias: 'Popular'}]
export default function RootLayout({children}: RootLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return (<>
    <html lang="en" >
    <head />

    <body
      className={cn(
        "max-w-screen-2xl  min-h-screen bg-white font-sans text-slate-900 antialiased ",
        fontSans.variable
      )}
    >
    <Providers>
      <div className={"flex"}>

        <div className={"fixed  right-44 left-44  w-48 my-16  border-r "}>
          <Categories categories={categoriesOb} />
          <PopularTags tags={TagsObject} />
        </div>

        <div className={"w-full"}>
          <header className={"z-40 w-full fixed "}>
            <Header scrolled={scrolled} setIsLogin={() => {} } setIsLogout={() => {}} />
          </header>
          {/*<header className={"z-40 right-44 fixed left-44"}>*/}
          {/*  <Header scrolled={scrolled} setIsLogin={() => {} } setIsLogout={() => {}} />*/}
          {/*</header>*/}



          <div className={"ml-60 left-60 my-20 relative"}>
            {children}
          </div>
        </div>
      </div>
    </Providers>

    </body>
    </html></>)
}
