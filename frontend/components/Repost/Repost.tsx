import RepostIcon from './Repost.svg';
import { motion } from 'framer-motion';
export const Repost = (): JSX.Element => {
  return <div>
    <motion.svg className={"outline-0"}  whileHover={{ scale: 1.1, border: 0, }}
                 whileTap={{ scale: 0.9, border: 0, }}  width="36" height="36" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_162_78)">
        <path d="M28.7083 30.9167H24.2917C20.6691 30.9153 17.1151 31.9041 14.08 33.7762C10.9125 35.6484 8.38195 38.3326 6.69567 41.5387C6.64827 40.9437 6.6247 40.347 6.625 39.75C6.625 27.5534 16.5117 17.6667 28.7083 17.6667V6.625L50.7917 24.2917L28.7083 41.9583V30.9167Z" fill="black"/>
      </g>
      <defs>
        <clipPath id="clip0_162_78">
          <rect width="53" height="53" fill="white"/>
        </clipPath>
      </defs>
    </motion.svg>

    {

    }
  </div>;

}
