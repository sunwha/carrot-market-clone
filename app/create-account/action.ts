"use server"
import db from "@/src/shared/lib/db"
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
  .refine(checkPassword, { message: "비밀번호가 일치하지 않아요", path: ["confirm_password"] })

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("useremail"),
    password: formData.get("user_password"),
    confirm_password: formData.get("user_password_confirm")
  }

  const result = formSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten()
  } else {
    const user = await db.user.findUnique({
      where: {
        username: result.data.username
      },
      select: {
        id: true
      }
    })
    console.log(user)
    // check if username is taken
    // check if the email is already in use
    // hash the password
    // save the user to the database
    // log the user in
    // redirect to the home
  }
}
