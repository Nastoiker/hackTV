import { CommentCard } from "@/components/Comment/Comment.card"
import { ICommentsProps } from "@/components/Comment/Comment.props"
import { CommentForm } from "@/components/Comment/CommentSend"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetCommentsByVideoQuery} from "@/stores/slices/video.api";

export default function CommentsModal({
  video,
  user,
}: ICommentsProps) {
  const { data, isLoading, refetch } = useGetCommentsByVideoQuery(video.id);
  return (
    <div className="mb-4  w-full">
      {(data && data.length > 0) && (
        <ScrollArea className="max-h-96 h-72 rounded-md border border-slate-100 dark:border-slate-700">
          <div className="p-4">
            {data && data.map((c) => (
              <CommentCard key={c.id} comment={c} />
            ))}
          </div>
        </ScrollArea>
      )}
      <CommentForm sendComment={async () => {await refetch()}} video={video} user={user} />
    </div>
  )
}

// export default function CommentsModal({ onClose }) {
//   const [comment, setComment] = useState('');
//
//   function handleSubmit(event) {
//     event.preventDefault();
//     // Отправка комментария на сервер
//     onClose();
//   }
//
//   function handleCancel() {
//     setComment('');
//     onClose();
//   }
//
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <form onSubmit={handleSubmit}>
//           <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
//           <div className="buttons">
//             <button type="submit">Отправить</button>
//             <button type="button" onClick={handleCancel}>
//               Отмена
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
