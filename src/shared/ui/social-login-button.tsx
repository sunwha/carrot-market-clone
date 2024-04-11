import Link from "next/link"
import { AnchorHTMLAttributes } from "react"

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onCopy">

export const SocialLogin = ({ href, children, ...props }: LinkProps) => {
  return (
    <>
      <Link
        href={href || ""}
        {...props}
        className={`${props.className} transition-color block block h-10 w-full rounded-lg border-white bg-orange-500 text-center font-bold leading-10 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300`}>
        {children}
      </Link>
    </>
  )
}
