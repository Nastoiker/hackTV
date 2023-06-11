"use client"

import { useState } from "react"
  import { useRouter } from "next/navigation"
import {
  useCreateCategoryMutation,
  useCreateSecondCategoryMutation, useMusicsAllQuery, useUsersQuery,
} from "@/stores/slices/admin.api"
import { useCheckAuthQuery } from "@/stores/slices/regapi"

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {CreateFirstCategoryComponent} from "@/components/admin/createFirstCategory";
import {CreateSecondCategory} from "@/components/admin/createSecondCategory";
import {Htag} from "@/components/Htag/Htag";
import {LayoutUserForAdmin} from "@/components/admin/UsersAdminLayout";
import {Input} from "@/components/ui/input";
import {DeleteFirstCategory} from "@/components/admin/deleteFirstCategory";
import {DeleteSecondCategoryComponent} from "@/components/admin/deleteSecondCategory";

export default function IndexPage() {
  const [currentSector, setCurrentSector] = useState<string>( );

  // const [createCategory, Category] = useCreateCategoryMutation({});
  // const [createSecond, Second] = useCreateSecondCategoryMutation({});
  // const musics = useMusicsAllQuery({});
  const users = useUsersQuery({});
  const router = useRouter();
  const [searchtUser, setSearchUser] = useState<string>('');
  // if( data && data.role !== 'admin') {
  //    router.push('/');
  // }
  return <div className={"mx-auto w-full"}>
    <h1 className="inline-block my-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
     Admin
    </h1>
    <div className={'pl-2 border rounded-md p-2 sm:flex sm:space-x-5'}>
      <div  className={cn(
        " py-5 pointer  transition-all hover:border-b-4 ",
        currentSector === "createCategory" && "border-b-4 "
      )} onClick={() => setCurrentSector('createCategory')}>
        <h1 className={'font-extrabold tracking-tight'}>
          Создание категории
        </h1>
      </div>
      <div   className={cn(
        " py-5 pointer  transition-all hover:border-b-4 ",
        currentSector === "video" && "border-b-4 "
      )} onClick={() => setCurrentSector('video')}><h1 className={'font-extrabold tracking-tight'}>
        Видео
      </h1></div>
      <div    className={cn(
        " py-5 pointer   transition-all hover:border-b-4 ",
        currentSector === "users" && "border-b-4"
      )} onClick={() => setCurrentSector('users')}><h1 className={'font-extrabold tracking-tight'}>
        Пользователи
      </h1></div>
      <div   className={cn(
        " py-5 pointer transition-all hover:border-b-4 ",
        currentSector === "musics" && "border-b-4"
      )}  onClick={() => setCurrentSector('musics')}><h1 className={'font-extrabold tracking-tight'}>Музыка</h1></div>
    </div>
    {
      currentSector==='createCategory' && <div className={'space-y-10 width-[900px]'}>
      <div className={'border rounded-lg p-5'}>
        <Htag type={'h1'}>Создание первой категории</Htag>
        <CreateFirstCategoryComponent />
      </div>
      <div className={'border rounded-lg p-5'}>
        <Htag type={'h1'}>Создание второй категории</Htag>
        <CreateSecondCategory />
      </div>
        <div  className={'border rounded-lg p-5'}>
          <Htag type={'h1'}>Удаление первой категории</Htag>
        <DeleteFirstCategory  />
        </div>
      <div  className={'border rounded-lg p-5'}>
        <Htag type={'h1'}>Удаление второй категории</Htag>
        <DeleteSecondCategoryComponent />
      </div>
      </div>
    }
    {
      currentSector==='users' && <div>
      <Input placeholder='Поиск пользователя' onChange={(e) => {setSearchUser(e.target.value)}} />
      <LayoutUserForAdmin sortBy={searchtUser} channels={users.data && users.data } />
      </div>
    }
    {
      currentSector==='musics' && <div>

      </div>
    }
  </div>
}
