"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {FieldError} from "react-hook-form";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;

}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <>
          <textarea
            className={cn(
              "flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700  dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
              className
            )}
            ref={ref}
            {...props}
          />
        {error && <span className={"text-red-200 my-2"}>{error.message}</span>}
      </>

    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
