import {useState} from "react";

export const Report = ({ videoId, userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return <div>
    {
      isOpen ? <div onClick={setIsOpen((o) => !o)>

      </div> : <div>

      </div>
    }
  </div>
}
