import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import IconUp from './up.svg';
import IconClose from './close.svg';
import IconMenu from './menu.svg';
export const icons =  {
    IconUp,
    IconClose,
    IconMenu,
}
export type IconsName = keyof typeof icons;
export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    appearance: 'primary' | 'white';
    icon: IconsName;
}