import {ReactNode} from "react";

export const RuleComponent = ({children}: {children: ReactNode}): JSX.Element => {
  return <div className={" my-5 rounded-xl shadow-md p-5"}>
    {children}
  </div>
}
