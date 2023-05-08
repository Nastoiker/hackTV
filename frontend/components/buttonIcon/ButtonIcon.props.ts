import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

import IconClose from "./close.svg"
import IconMenu from "./menu.svg"
import IconUp from "./up.svg"

export const icons = {
  IconUp,
  IconClose,
  IconMenu,
}
export type IconsName = keyof typeof icons
export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance: "primary" | "white"
  icon: IconsName
}
