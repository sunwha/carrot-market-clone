"use server"
import db from "@/src/shared/lib/db"
import getSession from "@/src/shared/lib/session"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import { z } from "zod"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../../src/shared/lib/constants"

const checkPassword = ({
  password,
  confirm_password
}: {
  password: string
  confirm_password: string
}) => password === confirm_password

const passwordRegex = PASSWORD_REGEX

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: "문자만 쓸 수 있어요", required_error: "필수 입력 사항입니다" })
      .min(3, "너무 짧아요")
      .max(10, "너무 길어요")
      .toLowerCase()
      .trim()
      .transform((value) => value.replace(/\s+/g, " ")),
    email: z.string().email().toLowerCase().trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "너무 짧아요")
      .regex(passwordRegex, "비밀번호가 너무 쉬워요"),
    confirm_password: z.string().min(6, "너무 짧아요")
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        id: true
      }
    })
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이름이에요",
        path: ["username"],
        fatal: true
      })
      return z.NEVER
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    })
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이메일이에요",
        path: ["email"],
        fatal: true
      })
      return z.NEVER
    }
  })
  .refine(checkPassword, { message: "비밀번호가 일치하지 않아요", path: ["confirm_password"] })

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("useremail"),
    password: formData.get("user_password"),
    confirm_password: formData.get("user_password_confirm")
  }

  const result = await formSchema.safeParseAsync(data)
  if (!result.success) {
    console.log(result.error.flatten())
    return result.error.flatten()
  } else {
    // hash the password
    const hashedPassword = await bcrypt.hash(result.data.password, 12)

    // save the user to the database
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    })

    // log the user in
    const cookies = await getSession()
    //@ts-ignore
    cookies.id = user.id
    await cookies.save()

    // redirect to the home
    redirect("/profile")
  }
}
