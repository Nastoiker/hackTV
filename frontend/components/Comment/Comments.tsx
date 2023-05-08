import { useState } from "react"
import { motion } from "framer-motion"

import CommentsModal from "@/components/Comment/commentScrollArea"
import { ICommentsProps } from "./Comment.props"

export const Comments = ({
  setIsOpen,
}: {
  setIsOpen: () => void
}): JSX.Element => {
  return (
    <div>
      <button onClick={() => setIsOpen()}>
        <motion.svg
          className="outline-0"
          whileHover={{ scale: 0.9, border: 0 }}
          whileTap={{ scale: 0.9, border: 0 }}
          fillRule="evenodd"
          fill={"currentcolor"}
          clipRule="evenodd"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="35"
          height="35"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8z" />
        </motion.svg>
      </button>
    </div>
  )
}
