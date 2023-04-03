import {ScrollArea} from "@/components/ui/scroll-area";
import {ICommentsProps} from "@/components/Comment/Comment.props";
import {CommentCard} from "@/components/Comment/Comment.card";
import {CommentForm} from "@/components/Comment/CommentSend";

export default function CommentsModal({comments}: ICommentsProps) {
  return (
    <div className="modal">
      <ScrollArea className="h-fit w-64 rounded-md border border-slate-100 dark:border-slate-700">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Комментарии</h4>
          {
            comments.map(c => <CommentCard key={c.id} comment={c}/>)
          }
        </div>
      </ScrollArea>
      <CommentForm />
    </div>
  );
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
