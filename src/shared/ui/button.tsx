import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  styleType,
  children,
  loading,
  ...props
}: ButtonProps & { href?: string } & { styleType?: "full" | "text" } & { loading?: boolean }) => {
  let style = ""
  if (styleType === "full") {
    style =
      "transition-color block h-10 w-full rounded-lg border-white bg-orange-500 text-center font-bold leading-10 hover:bg-orange-400 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:bg-neutral-400"
  } else if (styleType === "text") {
    style = "border-b font-bold"
  }

  return (
    <button disabled={loading} {...props} className={`${style} ${props.className}`}>
      {loading ? "Loading..." : children}
    </button>
  )
}
