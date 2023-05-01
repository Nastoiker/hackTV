import Image from "next/image";
import Profile from './Profile.svg';
import {IUser} from "@/types/User.interface";
import {ProfileIconProps} from "@/components/user/ProfileIcon.props";
import Link from "next/link";

export const ProfileIcon = ({user}: ProfileIconProps) => {
  return <>
    {
      ( user.avatar && user.avatar?.length > 0) ? <div className={"w-14"}>
                <Link href={'/profile'}>
                  <img alt={'avatar'} className={"rounded-full w-12 h-12"}  width={12} height={12} src={ 'http://localhost:8000/user' + user.avatar}/>
                </Link>
      </div> : <div>
        <Link href={'/profile'}>
          <img alt={'avatar'} className={"rounded-full w-20 h-20"}  width={34} height={34} src={Profile.src}/>
        </Link>
      </div>
    }
  </>
}
