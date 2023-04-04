"use client"
import { motion } from 'framer-motion';
import {useState} from "react";
import {SecondLevelCategory} from "@/stores/slices/category.slice";
export const CategoryButton = ({name, alias, secondLevelCategory}: { name: string, alias: string, secondLevelCategory: SecondLevelCategory[]}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    return <motion.div layout >
      <motion.button  onClick={() => setIsOpen((s) => !s)} whileHover={{opacity: 0.5, scale: 1.1}} className={"mr-2 block border-0 bg-blue-400 rounded-2xl px-5 py-2 "}>
        {name}
      </motion.button>
      {

        isOpen && secondLevelCategory.map( s =><motion.button  whileHover={{opacity: 0.5, scale: 1.1}}  className={" block border-0   rounded-2xl px-7 py-2"}>{s.name}</motion.button>)

      }
    </motion.div>
     ;
};
