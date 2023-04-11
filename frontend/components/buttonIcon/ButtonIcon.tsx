import {ButtonIconProps, icons} from "./ButtonIcon.props";
import styles from "./ButtonIcon.module.css"
import cn from 'classnames';
import Image from "next/image";
export const ButtonIcon = ({appearance, className, icon, ...props}: ButtonIconProps): JSX.Element => {
    const IconCurrent = icons[icon];
    return (
        <button
            className={cn(styles.button," " + className + " ", " w-8 ", {
            [styles.primary]: appearance == 'primary',
            [styles.ghost]: appearance == 'white',
            })}
            {...props}
        >
                <Image alt={'icon11'} className={"m-auto"} src={IconCurrent} />
    </button>
    )
};
