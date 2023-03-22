"use client"
import { motion } from 'framer-motion';
export const CategoryButton = ({name, alias}: { name: string, alias: string}) => {
    return <motion.button whileHover={{opacity: 0.5, scale: 1.1}} className={"mr-2 block border-0 bg-blue-400 rounded-2xl px-5 py-2 "}>
      {name}
    </motion.button>;
};
