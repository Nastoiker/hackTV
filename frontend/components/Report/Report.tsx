import { useState } from "react"
import { motion } from "framer-motion"

export const Report = ({ videoId, userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
      <motion.svg
        className={"outline-0"}
        onClick={() => setIsOpen((o) => !o)}
        width="36"
        whileHover={{ scale: 0.9, border: 0 }}
        whileTap={{ scale: 0.9, border: 0 }}
        height="36"
        viewBox="0 0 43 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.5 42.75C9.76363 42.75 0.25 33.2364 0.25 21.5C0.25 9.76363 9.76363 0.25 21.5 0.25C33.2364 0.25 42.75 9.76363 42.75 21.5C42.75 33.2364 33.2364 42.75 21.5 42.75ZM21.5 38.5C26.0087 38.5 30.3327 36.7089 33.5208 33.5208C36.7089 30.3327 38.5 26.0087 38.5 21.5C38.5 16.9913 36.7089 12.6673 33.5208 9.47919C30.3327 6.29107 26.0087 4.5 21.5 4.5C16.9913 4.5 12.6673 6.29107 9.47919 9.47919C6.29107 12.6673 4.5 16.9913 4.5 21.5C4.5 26.0087 6.29107 30.3327 9.47919 33.5208C12.6673 36.7089 16.9913 38.5 21.5 38.5ZM19.375 27.875H23.625V32.125H19.375V27.875ZM19.375 10.875H23.625V23.625H19.375V10.875Z"
          fill="black"
        />
      </motion.svg>
      {isOpen && <div className={"absolute flex flex-col"}>
          <button><h1>Оскорбление личности</h1></button>
          <button><h1>Издевательство над животными</h1></button>
          <button><h1>Насилие</h1></button>
      </div>}
    </div>
  )
}
