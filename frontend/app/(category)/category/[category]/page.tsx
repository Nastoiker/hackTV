import { notFound } from "next/navigation"
import {LayoutVideo} from "@/components/Layot.video";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {NotFound} from "next/dist/client/components/error";


interface PageProps {
  params: { category: string };
}
 async function getCategory(alias) {
  const res = await fetch('http://localhost:8000/Video/category/:' + alias);
  console.log(res);
  const data: any[] = await res.json();
  return data;
}

export default async function PagePage({ params }: PageProps) {
  const slug = params?.category;
  if(!slug) {
    return <div></div>;
  }
  const videos = await getCategory(slug);
  const category = await  Promise.all(videos);
  if(!videos) return <div>{slug}</div>;
  // @ts-ignore
  const result = category.videos;
  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          {slug}
        </h1>
        <LayoutVideo videos={result} />
      </div>
      <hr className="my-4 border-slate-200" />

    </article>
  )
}
