import { useAppSelector } from "@/stores"

import { LayoutFounded } from "@/components/layout/layout.founded"

export default function ChannelPage() {
  const search = useAppSelector((state) => state.search.search)
  return (
    <div className={"block"}>
      <LayoutFounded />
      some
    </div>
  )
}
