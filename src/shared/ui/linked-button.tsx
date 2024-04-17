import Link, { LinkProps } from "next/link"
import { HTMLProps } from "react"

interface LinkedProps {
  styleType?: "full" | "text"
}

export const LinkedButton = ({
  styleType,
  children,
  ...rest
}: LinkedProps & LinkProps & HTMLProps<HTMLAnchorElement>) => {
  const style =
    styleType === "full"
      ? "transition-color block h-10 w-full rounded-lg border-white bg-orange-500 text-center font-bold leading-10 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      : styleType === "text"
        ? "border-b font-bold"
        : ""
  return (
    <Link {...rest} className={`${style} ${rest.className}`}>
      {children}
    </Link>
  )
}
