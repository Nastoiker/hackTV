"use client";

import {useRef, useState} from "react";
import {Like} from "@/components/like/Like";
export const Video = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  return <div>
  <video className={"rounded-3xl"} onClick={onVideoClick}  loop ref={videoRef} src={'http://localhost:8000/discord-mod.mp4'}>
    Your browser does not support the video tag.
  </video>
    <div>
      <Like />
    </div>
</div>};

