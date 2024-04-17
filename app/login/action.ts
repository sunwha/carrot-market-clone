"use server"
import db from "@/src/shared/lib/db"
import getSession from "@/src/shared/lib/session"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import { z } from "zod"
import { PASSWORD_MIN_LENGTH } from "../../src/shared/lib/constants"

const checkEmailExists = async (email: string) => {
  // find user by email
  const user = await db.user.findFirst({
    where: {
      email
    },
    select: {
      id: true
    }
  })
  return Boolean(user)
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .trim()
    .refine(checkEmailExists, "존재하지 않는 이메일이에요"),
  password: z.string().min(PASSWORD_MIN_LENGTH, "너무 짧아요")
})

export const handleLogin = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const result = await formSchema.safeParseAsync(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    // if the user exists, check the password
    const user = await db.user.findFirst({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    })
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "")

    // log the user in
    if (ok) {
      const session = await getSession()
      session.id = user!.id

      // return profile
      redirect("/profile")
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 틀렸어요"],
          email: []
        }
      }
    }
  }
}
