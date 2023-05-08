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

import { cn } from "@/lib/utils"
import { AuthComponent } from "@/components/Auth/Auth"
import { IHeaderProps } from "@/components/Header/HeaderProps"
import { Search } from "@/components/search/search"
import { Button } from "@/components/ui/button"
import { ProfileIcon } from "@/components/user/Profile.icon"

export const Header = () => {
  const { data } = useCheckAuthQuery({})
  if (!data) {
  } else {
    console.log("Data:", data.email)
  }
  const [scrolled, setScrolled] = useState(false)

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
        "flex items-center h-16 border-b  max-w-screen-2xl ",
        scrolled ? "bg-blue-50" : "bg-white"
      )}
    >
      <div className={"min-w-68 lg:pr-36"}>
        <Link href={"/"}>HackTv</Link>
      </div>

      <Search />
      {data ? (
        <div className={"flex items-center"}>
          <Link href={"/profile"}>
            <ProfileIcon user={data} />
          </Link>{" "}
          <Button onClick={() => localStorage.removeItem("token")}>
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
