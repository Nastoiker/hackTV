import {IUser} from "@/types/User.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";
 interface  StatsPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: IUser;
}
export const StatsPage = ({user, className, ...props}: StatsPageProps) => {
  return <div className={className}>

  </div>;
}
