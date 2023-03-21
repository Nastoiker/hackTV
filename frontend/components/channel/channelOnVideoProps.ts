import {IUser} from "@/types/User.interface";

export interface channelOnVideoProps {
  user: IUser,
  setIsFolow: () => {},
  folow: boolean,
}
