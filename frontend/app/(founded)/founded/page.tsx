import { notFound } from "next/navigation"
import {LayoutVideo} from "@/components/Layot.video";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {NotFound} from "next/dist/client/components/error";
import {IVideo} from "@/types/Video.interface";
import {LayoutFounded} from "@/components/layout/layout.founded";

export interface VideoByCategory {
  id: string
  name: string
  alias: string
  firstLevelId: string
  videos: IVideo[]
}

interface PageProps {
  params: { found: string };
}

export default  function MainFound({ params }: PageProps) {
  const found = params?.found;
  if(!found) {
    return <div></div>;
  }
  return (
    <div>
      asdasdasd
    </div>
//     <div className="">
//       <LayoutFounded />
//       <div className="space-y-4">
//         <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
//           {found}
//         </h1>
//       </div>
//       <hr className="my-4 border-slate-200" />
// asdasdasd
//     </div>
  )
}
