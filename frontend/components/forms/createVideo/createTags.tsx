import {Input} from "@/components/ui/input";
import {KeyboardEventHandler, useState} from "react";
import Image from "next/image";
import {Htag} from "@/components/Htag/Htag";

export const CreateTags = ({tags, injectTag, deleteTag}: { tags: {tag: string, id: number}[], injectTag: (tag: {tag: string, id: number}) => void, deleteTag: (id: number) => void}) => {
  const [value, setValue] = useState<string>('');

  const handleKeyDown  = (event: any) => {
    if(event.key=='Enter') {
      if(tags.length>5 || tags.find( t => t.tag===value)) return;
      injectTag({ tag: value, id: 0});
      setValue('');
    }
    console.log(event.key);
  }
  const onChange = (e: any) => {
    console.log(e.target.value);
      setValue(e.target.value);
  }
  return <div>
    { tags.length>0 &&
    <div className={"flex  border border-black p-5 m-2 rounded-md space-x-2 space-y-1 flex-wrap"}>
      { tags && tags.map( (t) => <div className={"flex border px-5 py-2 rounded-full border-white"} key={t.id}>#{t.tag}<button className={"border border-black p-1 ml-1 rounded-full"} onClick={() => deleteTag(t.id)}><svg width="10" height="10" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="16.5104" width="23" height="3" rx="1.5" transform="rotate(-45 0 16.5104)" fill="black"/>
        <rect x="2.25305" width="23" height="3" rx="1.5" transform="rotate(45 2.25305 0)" fill="black"/>
      </svg>
      </button></div>)}
      {tags.length>5 && <Htag type={'h2'}>Максимальное количество тегов!</Htag>}
    </div>}
    <Input value={value} onChange={(event) => onChange(event)} onKeyDown={handleKeyDown} placeholder={'Чтобы добавить тег напиши тег и нажмите enter'} />
  </div>;
}
