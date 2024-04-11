interface FormInputProps {
  type: string
  placeholder: string
  required: boolean
  errors: string[]
}

export const FormInput = ({ type, placeholder, required, errors }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        className="peer h-10 w-full rounded-md border-none bg-transparent px-3 ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  )
}
