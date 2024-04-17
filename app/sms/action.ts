"use server"

import { redirect } from "next/navigation"
import validator from "validator"
import { z } from "zod"

const phoneShcema = z
  .string()
  .trim()
  .refine((userphone) => validator.isMobilePhone(userphone, "ko-KR"), "wrong phone format")
const tokenSchema = z.coerce.number().min(100000).max(999999)

interface ActionState {
  token: boolean
}

export async function smsVerification(prevState: ActionState, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token")
  }

  if (!prevState.token) {
    const result = phoneShcema.safeParse(data.phone)
    if (!result.success) {
      return { token: false, error: result.error.flatten() }
    } else {
      return { token: true }
    }
  } else {
    const result = tokenSchema.safeParse(data.token)
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten()
      }
    } else {
      // login
      redirect("/")
    }
  }
}
