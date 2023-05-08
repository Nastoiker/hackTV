import Image from "next/image"
import cn from "classnames"

import styles from "./ButtonIcon.module.css"
import { ButtonIconProps, icons } from "./ButtonIcon.props"

export const ButtonIcon = ({
  appearance,
  className,
  icon,
  ...props
}: ButtonIconProps): JSX.Element => {
  const IconCurrent = icons[icon]
  return (
    <button
      className={cn(styles.button, " " + className + " ", " w-8 ", {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "white",
      })}
      {...props}
    >
      <Image alt={"icon11"} className={"m-auto"} src={IconCurrent} />
    </button>
  )
}
