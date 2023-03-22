import {Search} from "@/components/search/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IHeaderProps} from "@/components/Header/HeaderProps";
import {redirect} from "next/navigation";
import {ProfileIcon} from "@/components/user/Profile.icon";
import {useState} from "react";
import {cn} from "@/lib/utils";
export const Header = ({scrolled, user, setIsLogin, setIsLogout}: IHeaderProps) => {



  return <div className={ cn("flex items-center h-16 border-b  pr-44 pl-44 w-full",  scrolled ? "bg-blue-50" : "bg-white")}>
    <div className={"px-auto min-w-68 pr-36"}>
      HackTv
    </div>



      <Search />
    {
      user ? <Link href={'/profile'}>
        <ProfileIcon user={user} />
      </Link> : <div className={"flex"} ><Button> <Link href={'Authorization'} > Регистрация </Link></Button> <Button variant="ghost"><Link href={'Registration'} > Авторизация </Link></Button></div>
    }

    </div>
}
