"use client"

import * as React from "react"
import { FieldError } from "react-hook-form"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <>
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className={"text-red-200 my-2 block"}>{error.message}</span>}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
