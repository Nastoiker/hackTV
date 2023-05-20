import { DetailedHTMLProps, HTMLAttributes } from "react"

import { IUser } from "@/types/User.interface"

export interface UploadImageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onSelectFile: (e: any) => void;
}

