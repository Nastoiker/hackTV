import {DetailedHTMLProps, HTMLAttributes} from "react";

export  interface SortButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    sortByLike: () => void;
    sortByDate: () => void;
}
