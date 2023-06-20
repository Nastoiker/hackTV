import {useEffect, useState} from "react";


export const useWidthScreen = () => {
  const isBrowser = typeof window !== 'undefined';
  const [stateW, setStateW] = useState<number>(0);

  const handleScroll = () => {
    const currrentW = isBrowser ? window.innerWidth : 0;
    setStateW(currrentW);
  }
  useEffect(
    () => {
      window.addEventListener('resize', handleScroll, {passive: true});
      return () => window.removeEventListener('resize', handleScroll)
    } , []
  )
  return stateW;
}
