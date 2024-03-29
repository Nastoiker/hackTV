"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SecondLevelCategory } from "@/stores/slices/category.slice"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

export const CategoryButton = ({
  name,
  alias,
  secondLevelCategory,
}: {
  name: string
  alias: string
  secondLevelCategory: SecondLevelCategory[]
}) => {
  const useSlowMotion = useReducedMotion()
  const router = useRouter()
  const pathname = usePathname()

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: useSlowMotion ? 1 : 0,
      height: 0,
    },
  }
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const variants = {
    visible: {
      marginBottom: 20,
      transition: useSlowMotion
        ? {}
        : {
            when: "beforeСhildren",
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  }
  return (
    <div>
      <div
        onClick={() => setIsOpen((s) => !s)}
        className={
          " cursor-pointer text-white mr-2 w-36 block border-0 bg-blue-400 rounded-lg px-5 py-2 "
        }
      >
        {name}
      </div>
      <motion.div
        initial={isOpen ? "visible" : "hidden"}
        animate={isOpen ? "visible" : "hidden"}
        variants={variants}
        layout
      >
        {isOpen &&
          secondLevelCategory.map((s) => (
            <motion.div
              key={s.alias}
              variants={variantsChildren}
              className={cn(
                "cursor-pointer block w-fit my-2 border-0 rounded-md pr-10 pb-1 pt-0.5 px-5 mx-7  overflow-hidden ",
                pathname.split("/")[2] === s.alias && "border-b-2"
              )}
              onClick={() => router.push(`/category/${s.alias}`)}
            >
              {s.name}
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}
