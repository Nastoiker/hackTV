"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { IMusic } from "@/types/Music.interface"
import { Htag } from "@/components/Htag/Htag"
import MusicIcon from "@/components/Music/MusicIcon.svg"
import { Button } from "@/components/ui/button"
import Profile from "@/components/user/Profile.svg"
import ProgressBar from "@/components/video/progress.video"

export const Music = ({ music, setActiveMusic, activeMusic}: { music: IMusic, setActiveMusic: () => void, activeMusic: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState('0:00');
const [durationTime, setDurationTime] = useState('0: 00');
  useEffect(() => {
    const audioEl = new Audio("http://localhost:8000/user/" + music.music_url)
    audioEl.addEventListener("ended", () => {
      setIsPlaying(false)
    })
    setAudio(audioEl)
    return () => audioEl.pause()
  }, [])
  const [volume, setVolume] = useState(1) // начальный уровень громкости
  useEffect(()=> {
    if(activeMusic!==music.id) {
      audio?.pause();
      setIsPlaying(false);
    }
  }, [audio?.currentTime]);
  useEffect(() => {
    if(!audio) return;

    const interval = setInterval(() => {
      const seconds = Math.floor(audio?.currentTime % 60);
      const minutes = Math.floor(audio?.currentTime / 60);

      const formattedTime =
        (minutes < 10 ? `0${minutes}` : minutes) +
        ':' +
        (seconds < 10 ? `0${seconds}` : seconds);

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [audio]);
  const handlePlayPause = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play();
      setActiveMusic();
    }
    setIsPlaying(!isPlaying)
  }
  const handleVolumeChange = (event) => {
    const value = parseFloat(event.target.value)
    setVolume(value)
    audio.volume = value
  }
  return (
    <div className="sm:flex justify-between items-center">
      <div className={"sm:flex sm:space-x-5 "}>
        <div>
          <Image
            alt="oblosjka"
            className={"w-20 h-20 rounded-md"}
            height={100}
            width={100}
            src={"http://localhost:8000/user/" + music.img}
          />
          <div className={"absolute ml-10 bg-white rounded-full p-2 border  -my-6 flex items-center"}>
            <svg
              width={20}
              height={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22 17.0022C21.999 19.8731 19.9816 22.2726 17.2872 22.8616L16.6492 20.9476C17.8532 20.7511 18.8765 20.0171 19.4649 19H17C15.8954 19 15 18.1046 15 17V13C15 11.8954 15.8954 11 17 11H19.9381C19.446 7.05369 16.0796 4 12 4C7.92038 4 4.55399 7.05369 4.06189 11H7C8.10457 11 9 11.8954 9 13V17C9 18.1046 8.10457 19 7 19H4C2.89543 19 2 18.1046 2 17V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V12.9987V13V17V17.0013V17.0022ZM20 17V13H17V17H20ZM4 13V17H7V13H4Z"></path>
            </svg>
            <Htag type={"h2"}>{music.videos.length}</Htag>
          </div>
        </div>
        <div>
          <Htag type={"h1"}>{music.name}</Htag>
          <div className={"flex items-center"}>
            <img
              className={"rounded-full w-6 h-6"}
              width={70}
              height={70}
              alt={"userSubs"}
              src={
                music.user.avatar?.length > 0
                  ? "http://localhost:8000/user" + music.user.avatar
                  : Profile.src
              }
            />
            <Htag type={"h3"} className={'text-gray-600'}>{music.user.login}</Htag>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <p>{currentTime}</p>

      <Button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
    </div>
  )
}
// return <div className={"box-shadow"}>
//
//   <div>
//     {music.alias}
//     <figure>
//       <figcaption>   <Htag type={'h1'}>{music.name}</Htag></figcaption>
//       <audio
//         className="outline-none rounded-md p-2 bg-gray-100"
//         controls
//         src={'http://localhost:8000/user/' + music.music_url}>
//       </audio>
//     </figure>
//   </div>
// </div>
