import Image from "next/image";
import Profile from './Profile.svg';
export const ProfileIcon = (user: User) => {
  return <div className={''}>
    {
      user.avatar ? <div>
        <Image alt={'avatar'} src={user.avatar}/>
      </div> : <div>
        <Image alt='defaultAvatar' src={Profile.src}></Image>
      </div>
    }
  </div>
}
