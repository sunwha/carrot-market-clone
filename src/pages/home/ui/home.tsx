import { Button } from "@/src/shared/ui/button"

export function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-5">
      <div className="flex h-3/4 flex-col justify-center text-center">
        <span className="text-9xl">🥕</span>
        <h1 className="mt-5 text-sm font-bold">!당근!</h1>
        <h2 className="mt-3 text-lg">당근마켓에 어서오세요!</h2>
      </div>
      <div className=" w-full text-center">
        <Button href="/create-account" styleType="full">
          시작하기
        </Button>
        <div className="pt-5">
          <span className="block pb-1 text-sm">이미 계정이 있나요?</span>
          <Button href="/login" styleType="text">
            로그인
          </Button>
        </div>
      </div>
    </main>
  )
}
