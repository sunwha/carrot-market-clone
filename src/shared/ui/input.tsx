import { InputHTMLAttributes } from "react"

interface InputProps {
  name: string
  errors?: string[]
}

export const Input = ({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        {...rest}
        className="peer h-10 w-full rounded-md border-none bg-transparent px-3 ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  )
}
