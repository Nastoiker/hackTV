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
import {LikeSimple} from "@/components/like/LikeSimple";
import {useLikeVideoMutation} from "@/stores/slices/user.api";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {IUser} from "@/types/User.interface";
import ProgressBar from "@/components/video/progress.video";

export const Video = ({ user, type, video, className, ...props}: VideoProps): JSX.Element => {
  const query = {videoId: video.id};
  const  [likeVideo, { isLoading, isError, data, error }] =  useLikeVideoMutation();
  const [countLike, setCount] = useState<number>(video.likesCount);
  const [liked, SetLike] = useState<boolean>(false);
  useEffect(() => {
  console.log(user);
    if(user) {
    const checkLike = user.Like.find( v => v.videoId === video.id);
    checkLike && SetLike(true);
  }}, []);

  const handleLikeVideo = async (query) => {
    if(!user) return;
    SetLike((l) => !l);

    try {
      const result = await likeVideo(query);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    liked ? setCount(countLike - 1) : setCount(countLike + 1);

  };
  const videoRef = useRef(null);
  const [isFolowing, setIsFolowing] = useState<boolean>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current?.currentTime);
    };
    videoRef.current.addEventListener('loadedmetadata', () => {
      setCurrentTime(videoRef.current.currentTime);
    });
    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      if (videoRef.current) {
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
    if (isFolowing) {
      setIsFolowing(false)
      return new Promise((resolve) => {
        setTimeout(() => resolve(''), 1000)
      });
    }
    setIsFolowing(true)
    return new Promise((resolve) => {
      setTimeout(() => resolve(''), 1000)
    });
  }
  const videoPath = 'http://localhost:8000/video' + video.embed_link;
  return <div className={className}>


    <div className={"sm:flex justify-center"}>
      <div>
        <SubscribeChannel user={user} video={video} isSubscribe={isFolowing} setIsSubscribe={() => Folowing}/>

        <video width={350} height={350} className={"rounded-3xl"}  onClick={onVideoClick} loop ref={videoRef} src={videoPath.replace(' ' , '')}>
        </video>
        {/*<div className={"bg-black w-fit rounded-xl p-2 absolute -my-14 ml-64 text-amber-50"}>{Math.floor(currentTime)} : { videoRef.current && Math.floor(videoRef?.current?.duration)}</div>*/}
        <div className={"bg-black text-amber-50 w-fit absolute -my-20  mx-4 opacity-70 p-2 rounded-xl"}>
          {video.Title}
          <p>
            {video.Description}
          </p>
        </div>
        <div>
          <ProgressBar value={currentTime} max={videoRef?.current?.duration} />
          <div className={'flex justify-between px-2'}>

          <div className={"flex items-center "}><div className={"flex items-center"}><Comments setIsOpen={() => setIsOpen(s => !s)} comments={video.Comment} /> <h1 className={"mx-2"}>{video.Comment.length}</h1></div>   </div>

          <Repost />
        </div>

        </div>
        </div>

      <div className={" my-12 px-4  grid place-content-start gap-y-6 justify-items-center  px-auto"}>
        <div>
          <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4998 0.875C27.2618 0.875 34.5516 7.18 36.0807 15.5C34.5532 23.82 27.2618 30.125 18.4998 30.125C9.73782 30.125 2.44807 23.82 0.918945 15.5C2.44645 7.18 9.73782 0.875 18.4998 0.875ZM18.4998 26.875C21.814 26.8743 25.0297 25.7486 27.6207 23.6821C30.2117 21.6157 32.0245 18.7309 32.7624 15.5C32.0218 12.2716 30.2078 9.39001 27.6171 7.32629C25.0263 5.26258 21.8121 4.13886 18.4998 4.13886C15.1876 4.13886 11.9733 5.26258 9.38256 7.32629C6.7918 9.39001 4.97782 12.2716 4.2372 15.5C4.9751 18.7309 6.78792 21.6157 9.37893 23.6821C11.9699 25.7486 15.1857 26.8743 18.4998 26.875ZM18.4998 22.8125C16.5604 22.8125 14.7005 22.0421 13.3291 20.6707C11.9577 19.2994 11.1873 17.4394 11.1873 15.5C11.1873 13.5606 11.9577 11.7006 13.3291 10.3293C14.7005 8.95792 16.5604 8.1875 18.4998 8.1875C20.4392 8.1875 22.2992 8.95792 23.6705 10.3293C25.0419 11.7006 25.8123 13.5606 25.8123 15.5C25.8123 17.4394 25.0419 19.2994 23.6705 20.6707C22.2992 22.0421 20.4392 22.8125 18.4998 22.8125ZM18.4998 19.5625C19.5773 19.5625 20.6106 19.1345 21.3724 18.3726C22.1343 17.6108 22.5623 16.5774 22.5623 15.5C22.5623 14.4226 22.1343 13.3892 21.3724 12.6274C20.6106 11.8655 19.5773 11.4375 18.4998 11.4375C17.4224 11.4375 16.3891 11.8655 15.6272 12.6274C14.8653 13.3892 14.4373 14.4226 14.4373 15.5C14.4373 16.5774 14.8653 17.6108 15.6272 18.3726C16.3891 19.1345 17.4224 19.5625 18.4998 19.5625Z" fill="gray"/>
          </svg>

        </div>
        <div>
          <LikeSimple isLike={liked} setLike={() => handleLikeVideo(query)}/>
          <h1 className={"ml-3.5"}>{countLike}</h1>
        </div>

        <Report videoId={video.id} userId={'1'}/>
        <div className={"bg-gray-100 border-4 border-gray-400 my-24 rounded-3xl p-5"}>{video.tag.map( t => <p key={t.tag.id}>{t.tag.name}</p>)}</div>
      </div>
    </div>
    <div className={"w-full"}>{
      isOpen && <CommentsModal video={video} user={user} comments={video.Comment}/>
    }</div>
</div>

};

