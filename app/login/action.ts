"use server"

import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../../src/shared/lib/constants"

const formSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(PASSWORD_MIN_LENGTH, "너무 짧아요")
})

export const handleLogin = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const result = formSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    console.log(result.data)
  }
}
