import {ICommentProps} from "./Comment.props";
import {useState} from "react";
export const Comments = ({comments}: ICommentProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return <div>
    <button onClick={(o) => !o}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8z"/></svg>
    </button>
    {
      isOpen && comments.map( c => {
          return <div></div>;
      })
    }
  </div>
}
