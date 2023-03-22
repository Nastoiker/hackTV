import {IUser} from "@/types/User.interface";

export interface IHeaderProps {
  user: IUser;
  setIsLogin: () => void;
  setIsLogout: () => void;
}
