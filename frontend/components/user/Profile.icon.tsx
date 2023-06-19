import Image from "next/image"
import Link from "next/link"

import { IUser } from "@/types/User.interface"
import { ProfileIconProps } from "@/components/user/ProfileIcon.props"
import Profile from "./Profile.svg"
import Profile2 from "./Profile2.svg"
import {api_url} from "@/domen.api";

export const ProfileIcon = ({ theme='light',  user }: ProfileIconProps) => {
  return (
    <div className={"min-w-[40px] min-h-[20px]"}>
      {user.avatar && user.avatar?.length > 0 ? (
            <img
              alt={"avatar"}
              className={"rounded-full w-12 h-12"}
              width={12}
              height={12}
              src={`${api_url}/user` + user.avatar}
            />
      ) : (

              theme==='light' ?   <img
                alt={"avatar"}
                className={"rounded-full  min-w-10 min-h-10 w-full h-20"}
                width={34}
                height={34}
                src={Profile.src}
              /> :
                <img
                  alt={"avatar"}
                  className={"rounded-full  min-w-10 min-h-10 w-full h-20"}
                  width={34}
                  height={34}
                  src={Profile2.src}
                />

      )}
    </div>
  )
}
