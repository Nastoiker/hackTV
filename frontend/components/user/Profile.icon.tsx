import Image from "next/image";
import Profile from './Profile.svg';
import {IUser} from "@/types/User.interface";
import {ProfileIconProps} from "@/components/user/ProfileIcon.props";
import Link from "next/link";

export const ProfileIcon = ({user}: ProfileIconProps) => {
  return <>
    {
      ( user.avatar && user.avatar?.length > 0) ? <div className={"w-14 w-full"}>
                <Link className={"min-w-10"} href={'/profile'}>
                  <img alt={'avatar'} className={"rounded-full w-12 h-12"}  width={12} height={12} src={ 'http://localhost:8000/user' + user.avatar}/>
                </Link>
      </div> : <div>
        <Link className={"min-w-[100px] w-full"} href={'/profile'}>
          <img alt={'avatar'} className={"rounded-full min-w-10 min-h-10 w-full h-20"}  width={34} height={34} src={Profile.src}/>
        </Link>
      </div>
    }
  </>
}
