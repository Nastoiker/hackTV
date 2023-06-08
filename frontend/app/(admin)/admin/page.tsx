"use client"

import { useState } from "react"
  import { useRouter } from "next/navigation"
import {
  useCreateCategoryMutation,
  useCreateSecondCategoryMutation, useMusicsAllQuery, useUsersQuery,
} from "@/stores/slices/admin.api"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import "/styles/admin.css"
import {cn} from "@/lib/utils";

export default function IndexPage() {
  const [createCategory, Category] = useCreateCategoryMutation({});
  const [createSecond, Second] = useCreateSecondCategoryMutation({});
  const { data, isLoading }= useCheckAuthQuery({});
  const [value, onChange] = useState(new Date());
  const musics = useMusicsAllQuery({});
  const users = useUsersQuery({});
  const [currentSector, setCurrentSector] = useState<string>( );
  if(isLoading) {
    return <div>loading</div>
  }
  const router = useRouter();
  if( data && data.role !== 'admin') {
     router.push('/');
  }
  return <div className={"mx-auto"}>Админка
    <div className={'flex flex-wrap space-x-5'}>
      <button onClick={() => setCurrentSector('createCategory')}>
        Создание категории
      </button>
      <button   className={cn(
        " py-5 pointer transition-all hover:border-b-4 border-black",
        currentSector === "video" && "border-b-4 border-black"
      )} onClick={() => setCurrentSector('video')}>Видео</button>
      <button    className={cn(
        " py-5 pointer transition-all hover:border-b-4 border-black",
        currentSector === "users" && "border-b-4 border-black"
      )} onClick={() => setCurrentSector('users')}>Пользователи</button>
      <button   className={cn(
        " py-5 pointer transition-all hover:border-b-4 border-black",
        currentSector === "musics" && "border-b-4 border-black"
      )}  onClick={() => setCurrentSector('musics')}>Музыка</button>
    </div>
    {
      currentSector==='createCategory' && <div>

      </div>
    }
    {
      currentSector==='users' && <div>

      </div>
    }
    {
      currentSector==='musics' && <div>

      </div>
    }
  </div>
}
