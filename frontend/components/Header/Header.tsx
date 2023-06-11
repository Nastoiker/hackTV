"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useAppSelector } from "@/stores"
import {
  AuthApi,
  useAuthorizationQuery,
  useCheckAuthQuery,
} from "@/stores/slices/regapi"
import Logo from '/public/logo.svg';
import LogoDark from '/public/logoDark.svg';
import { cn } from "@/lib/utils"
import { AuthComponent } from "@/components/Auth/Auth"
import { IHeaderProps } from "@/components/Header/HeaderProps"
import { Search } from "@/components/search/search"
import { Button } from "@/components/ui/button"
import { ProfileIcon } from "@/components/user/Profile.icon"
import Image from "next/image";
import Moon from 'public/moon.svg';
import Sun from 'public/sun.svg';
import {useTheme} from "next-themes";
export const Header = () => {
  const { data } = useCheckAuthQuery({})
  if (!data) {
  } else {
    console.log("Data:", data.email)
  }
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, theme } = useTheme()

  const changeTheme = () => {
    console.log(theme);
    setTheme( theme==='light' ? 'dark' : 'light');
  }
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  useEffect(() => {
    //add eventlistener to window
    document.addEventListener("scroll", handleScroll, { passive: true })
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "flex items-center z-60 h-16 border-b bg-background  max-w-screen-2xl ",
        scrolled ? "bg-background" : "bg-background"
      )}
    >
      <div className={"min-w-68 lg:pr-36"}>
        <Link className={"min-w-[40px] min-h-[100px]"} href={"/"}>
          {
            theme!=='dark' ?  <Image height={100} width={100} src={Logo} alt={'logo'} /> :  <Image height={100} width={100} src={LogoDark} alt={'logo'} />
          }
           </Link>
      </div>

      <Search />
      <button onClick={ () => changeTheme()}><img height={100} width={100} className={"h-8 w-8"} src={theme==='dark' ? Moon.src : Sun.src} alt="toggleTheme" /></button>
      {data ? (
        <div className={"flex items-center"}>
          <Link href={"/profile"}>
            <ProfileIcon theme={theme} user={data} />
          </Link>{" "}
          <Button className={"hidden sm:block"} onClick={() => localStorage.removeItem("token")}>
            <a href={"/"}>Выйти</a>
          </Button>
        </div>
      ) : (
        <div className={"flex"}>
          <Button>
            {" "}
            <Link href={"registration"}> Регистрация </Link>
          </Button>
          <AuthComponent />
        </div>
      )}
    </div>
  )
}
