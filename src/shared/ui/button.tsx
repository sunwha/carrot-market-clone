import Link from "next/link"
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onCopy">

export const Button = ({
  href,
  styleType,
  children,
  ...props
}: ButtonProps & { href?: string } & { styleType?: "full" | "text" }) => {
  let style = ""
  if (styleType === "full") {
    style =
      "transition-color block h-10 w-full rounded-lg border-white bg-orange-500 text-center font-bold leading-10 hover:bg-orange-400"
  } else if (styleType === "text") {
    style = "border-b font-bold"
  }

  return (
    <>
      {href ? (
        <Link href={href || ""} {...(props as LinkProps)} className={`${style} ${props.className}`}>
          {children}
        </Link>
      ) : (
        <button {...props} className={`${style} ${props.className}`}>
          {children}
        </button>
      )}
    </>
  )
}
