"use client"
import {motion, useReducedMotion} from 'framer-motion';
import {useState} from "react";
import {SecondLevelCategory} from "@/stores/slices/category.slice";
import Link from "next/link";
import {useRouter} from "next/navigation";
export const CategoryButton = ({name, alias, secondLevelCategory}: { name: string, alias: string, secondLevelCategory: SecondLevelCategory[]}) => {
  const useSlowMotion = useReducedMotion();
  const router = useRouter()
  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: useSlowMotion ? 1 : 0,
      height: 0,
    }
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const variants =
    {
      visible: {
        marginBottom: 20,
        transition: useSlowMotion ? {} :  {
          when: 'beforeChildren',
          staggerChildren: 0.1,
        }
      },
      hidden: {
        marginBottom: 0,
      }
    }
  return (
    <div >
      <div           onClick={() => setIsOpen((s) => !s)}
                     className={"mr-2 w-36 block border-0 bg-blue-400 rounded-2xl px-5 py-2 "}
      >
        {name}
      </div>
      <motion.div
        initial={isOpen ? 'visible' : 'hidden'}
        animate={isOpen ? 'visible' : 'hidden'}
        variants={variants}
        layout
      >
        {isOpen &&
          secondLevelCategory.map((s) => (
           <motion.div
                key={s.alias}
                variants={variantsChildren}
                className={"block border-0 rounded-2xl px-7 py-2 overflow-hidden"}
                onClick={() => router.push(`/category/${s.alias}`)}
              >
               <Link href={s.name}> {s.name}</Link>
              </motion.div>
          ))}
      </motion.div>

    </div>
  );s

};
