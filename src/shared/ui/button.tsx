"use client"
import { ButtonHTMLAttributes } from "react"
import { useFormStatus } from "react-dom"

interface ButtonProps {
  styleType?: "full" | "text"
}

export const Button = ({
  styleType,
  children,
  className,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus()
  const style =
    styleType === "full"
      ? "transition-color block h-10 w-full rounded-lg border-white bg-orange-500 text-center font-bold leading-10 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      : styleType === "text"
        ? "border-b font-bold"
        : ""
  return (
    <button {...rest} className={`${style} ${className}`} disabled={pending}>
      {pending ? "Loading..." : children}
    </button>
  )
}
