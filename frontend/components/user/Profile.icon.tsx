import Image from "next/image";
import Profile from './Profile.svg';
import {IUser} from "@/types/User.interface";
import {ProfileIconProps} from "@/components/user/ProfileIcon.props";
export const ProfileIcon = ({user}: ProfileIconProps) => {
  return <>
    {
      user.avatar ? <div>
        <Image alt={'avatar'} src={user.avatar}/>
      </div> : <div>
        <Image alt='defaultAvatar' src={Profile.src}></Image>
      </div>
    }
  </>
}
