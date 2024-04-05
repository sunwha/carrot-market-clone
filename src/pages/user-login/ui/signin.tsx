import { Button } from "@/src/shared/ui/button"
import { FormInput } from "@/src/shared/ui/form-input"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid"

export function SignIn() {
  return (
    <div className="flex flex-col gap-10 p-5 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">회원가입을 위해 아래 폼을 작성해주세요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Name" required={true} errors={[]} />
        <FormInput type="email" placeholder="Email" required={true} errors={[]} />
        <FormInput type="password" placeholder="Password" required={true} errors={[]} />
        <FormInput type="password" placeholder="Confirm password" required={true} errors={[]} />
        <Button styleType="full">Create account</Button>
        <div className="my-5 h-px w-full bg-neutral-500" />

        <div>
          <Button href="/sms" styleType="full">
            <span className="relative pl-8">
              <ChatBubbleOvalLeftEllipsisIcon className="absolute left-0 top-0 w-6" />
              Sign up with SMS
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}
