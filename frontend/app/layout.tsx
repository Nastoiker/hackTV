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
import Providers from "@/provider/providerRedux";
import {useAppDispatch, useAppSelector} from "@/stores";
import {getFirstCategory} from "@/stores/slices/category.slice";
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


  return (
    <html lang="en" >
    <head />
<body>
<div
  className={cn(
    "max-w-screen-2xl mx-auto AutoMargin min-h-screen bg-white font-sans  box-border text-slate-900 antialiased ",
    fontSans.variable
  )}
>
  <Providers>
    <div className={" flex flex-col MainLayout"}>



      <header className={"  w-full z-40  fixed top-0"}>
        <Header />
      </header>
      {/*<header className={"z-40 right-44 fixed left-44"}>*/}
      {/*  <Header scrolled={scrolled} setIsLogin={() => {} } setIsLogout={() => {}} />*/}
      {/*</header>*/}



      <div className={"w-56 my-16 fixed  border-r "}>
        <Categories />
        <PopularTags tags={TagsObject} />
      </div>
      <div className={"   xl: max-w-screen-2xl pl-64 pt-20  MainMargin"}>
        {children}
      </div>
    </div>


  </Providers>

</div>
</body>

    </html>)
}
