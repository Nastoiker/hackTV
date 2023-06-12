import {useBanUserMutation, useUnBanUserMutation} from "@/stores/slices/admin.api";
import {UserForAdmin} from "@/components/admin/UserInfoForAdmin";
import {Htag} from "@/components/Htag/Htag";
import {SortButton} from "@/components/Sorts/Sort.button";
import {Button} from "@/components/ui/button";
import {VideoForAdmin} from "@/components/admin/VideoForAdmin";
import {useDeleteVideoMutation} from "@/stores/slices/tagapi";

export function LayoutVideoforAdmin({
                                     video,
                                     sortBy='',
                                   }: {
  video: any[]
  sortBy: string,
}) {
  const [deleteVideo] = useDeleteVideoMutation();
  const handleDeleteVideo= async (id: string) => {
    await deleteVideo(id);
  }
  return (
    <div className={"mx-auto flex my-5 border rounded-md p-5"}>
      <div className={"w-full flex flex-wrap gap-5  mr-20"}>
        {video.length > 0 ? (
          video.filter(f => f.video.name.includes(sortBy)).map((m) => <>
            <VideoForAdmin video={m.video} />
            <div className={'block'}>
              <h1>Жалоба: {m.report.message}</h1>
              <Button onClick={() => handleDeleteVideo(m.video.id)}>
                Удалить видео
              </Button>
            </div>

          </>)
        ) : (
          <div className={"mx-auto"}>
            <Htag type={"h1"}> Ничего не найдено</Htag>
          </div>
        )}
      </div>
      <SortButton
        className="fixed top-25 right-5 xl:right-44"
        sortByLike={() => {
        }}
        sortByDate={() => {
        }}
      />
    </div>
  )
}
