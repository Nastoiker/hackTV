"use client";

import {useEffect, useRef, useState} from "react";
import {Like} from "@/components/like/Like";
import {VideoProps} from "@/components/video/VideoProps";
import Image from "next/image";
import {SubscribeChannel} from "@/components/video/SubscribeChannel";
import {Comments} from "@/components/Comment/Comments";
import {Report} from "@/components/Report/Report";
import View from "./View.svg";
import {Repost} from "@/components/Repost/Repost";
import {useGetVideosQuery, useAddVideoMutation, useDeleteVideoMutation} from "@/stores/slices/api";
import CommentsModal from "@/components/Comment/commentScrollArea";
export const VideoPreview = ({type, video, className, ...props}: VideoProps): JSX.Element => {
  const videoRef = useRef(null);
  const [isFolowing, setIsFolowing] = useState<boolean>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current.currentTime);
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

    }

    return () => {
      if(videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const Folowing = async () => {
    if(isFolowing) {
      setIsFolowing(false)
      return new Promise( (resolve) => { setTimeout(() => resolve(''), 1000)});
    }
    setIsFolowing(true)
    return new Promise( (resolve) => { setTimeout(() => resolve(''), 1000)});
  }
  const videoPath = 'http://localhost:8000/video' + video.embed_link;
  return <div className={className}>
    <SubscribeChannel video={video} isSubscribe={isFolowing} setIsSubscribe={() => Folowing}/>


    <div className={"flex"}>
      <div>
        <video width={100} height={100} className={"rounded-3xl"}  onClick={onVideoClick} loop ref={videoRef} src={videoPath.replace(' ' , '')}>
        </video>
        <div className={"bg-black w-fit rounded-xl p-2 absolute -my-14 mx-64 text-amber-50"}>{Math.floor(currentTime)} : { videoRef.current && Math.floor(videoRef?.current?.duration)}</div>
        <div className={"bg-black text-amber-50 w-fit absolute -my-20  mx-4 opacity-70 p-2 rounded-xl"}>
          {video.Title}
          <p>
            {video.Description}
          </p>
        </div>
        <div className={'flex justify-between px-2'}>

          <div className={"flex items-center "}><div className={"flex items-center"}><Comments setIsOpen={() => setIsOpen(s => !s)} comments={video.Comment} /> <h1 className={"mx-2"}>{video.comment_count}</h1></div>   </div>
          <Repost />
        </div>
      </div>

    </div>
    {
      isOpen && <CommentsModal comments={video.Comment}/>
    }
  </div>
};

