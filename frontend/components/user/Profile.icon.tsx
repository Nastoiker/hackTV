import Image from "next/image";
import Profile from './Profile.svg';
import {IUser} from "@/types/User.interface";
import {ProfileIconProps} from "@/components/user/ProfileIcon.props";
import Link from "next/link";

export const ProfileIcon = ({user}: ProfileIconProps) => {
  return <>
    {
      user.avatar ? <div className={"w-14"}>
                <Link href={'/profile'}>
                  <img alt={'avatar'} className={"rounded-full w-12 h-12"}  width={12} height={12} src={ 'http://localhost:8000/user' + user.avatar}/>
                </Link>
      </div> : <div>
        <Image alt='defaultAvatar' src={Profile.src}></Image>
      </div>
    }
  </>
}
