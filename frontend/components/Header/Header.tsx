import {Search} from "@/components/search/search";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IHeaderProps} from "@/components/Header/HeaderProps";
import {redirect} from "next/navigation";
import {ProfileIcon} from "@/components/user/Profile.icon";
export const Header = ({user, setIsLogin, setIsLogout}: IHeaderProps) => {
  return <div>
      <Search />
    {
      user ? <Link href={'/profile'}>
        <ProfileIcon user={user} />
      </Link> : <div><Button> <Link href={'Authorization'} > Регистрация </Link></Button> <Button variant="ghost"><Link href={'Registration'} > Регистрация </Link></Button></div>
    }
  </div>
}
