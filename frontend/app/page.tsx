
import {siteConfig} from "@/config/site";
import {Like} from "@/components/like/Like";

export default function IndexPage() {
  return <>
  <section className={" grid bg-amber-200 "}>
    <div className="flex max-w-[980px] flex-col items-start gap-2">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Beautifully designed components <br className="hidden sm:inline" />
        built with Radix UI and Tailwind CSS.
      </h1>
      <p className="p-200px max-w-[750px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
        Accessible and customizable components that you can copy and paste
        into your apps. Free. Open Source.{" "}
        <span className="font-semibold">
              Use this to build your own component library
            </span>
        .
      </p>
    </div>

    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-row">

        GitHub

      <pre className="hidden h-11 items-center justify-between space-x-2 overflow-x-auto rounded-lg border border-slate-100 bg-slate-100 pr-2 pl-6 dark:border-slate-700 dark:bg-black md:flex">
            <code className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-50">
              npx create-next-app -e https://github.com/shadcn/next-template
            </code>

          </pre>
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        You are looking at an early preview. You can follow the progress on{" "}

      </p>
    </div>
    <Like />
  </section>
  </>
}
