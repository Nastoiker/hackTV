import { notFound } from "next/navigation"


interface PageProps {
  params: {
    slug: string[]
  }
}
a
export async function generateStaticParams(): Promise<PageProps["params"][]> {

}

export default async function PagePage({ params }: PageProps) {
  const slug = params?.slug?.join("/")


  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
        </h1>
      </div>
      <hr className="my-4 border-slate-200" />
    </article>
  )
}
