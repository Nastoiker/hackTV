import {LayoutFounded} from "@/components/layout/layout.founded";
import {useAppSelector} from "@/stores";

export default  function ChannelPage() {
  const search = useAppSelector(state => state.search.search)
  return <div className={"block"}>
    <LayoutFounded />
    some
  </div>
}
