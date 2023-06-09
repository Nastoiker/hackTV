"use client"

import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Categories } from "@/components/Categoryes/Categories"
import { PopularTags } from "@/components/Header/PopularTags"
import { ButtonIcon } from "@/components/buttonIcon/ButtonIcon"
import styles from "@/components/buttonIcon/ButtonIcon.module.css"
import { IconsName } from "@/components/buttonIcon/ButtonIcon.props"

interface LeftSiteProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export const LeftSite = ({ className }: LeftSiteProps) => {
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const useSlowMotion = useReducedMotion()
  // useEffect(() => {
  //   setIsOpen(false)
  // }, [pathName!==''])
  const variants = {
    opened: {
      opacity: 1,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: useSlowMotion ? 1 : 0,
      x: "-100%",
    },
  }
  // const handleAnimationComplete = () => {
  //   if (!isOpen) setIsOpen(true);
  // };
  // , isOpen && " block ", styles.LeftSide
  console.log(isOpen)
  return (
    <div className={cn(className,"")}>
      <ButtonIcon
        appearance={"white"}
        className={"fixed my-20  w-24 z-40   " + styles.MenuButtin}
        icon={"IconMenu"}
        onClick={() => {
          setIsOpen((o) => !o)
        }}
      />
      <motion.div
        className={
          "w-48 fixed border-b bg-background h-full px-2  top-18 z-50  pr-2 border-r " +
          styles.leftSideMargin
        }
        variants={variants}
        initial={"opened"}
        animate={isOpen ? "opened" : "closed"}
      >
        <ButtonIcon
          appearance={"white"}
          className={"fixed  w-24 z-50   " + styles.MenuButtin}
          icon={"IconClose"}
          onClick={() => {
            setIsOpen((o) => !o)
          }}
        />
        <Categories />
        <PopularTags />
      </motion.div>
    </div>
  )
}
