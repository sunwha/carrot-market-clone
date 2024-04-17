import { LinkedButton } from "@/src/shared/ui/linked-button"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-5">
      <div className="flex h-3/4 flex-col justify-center text-center">
        <span className="text-9xl">🥕</span>
        <h1 className="mt-5 text-sm font-bold">!당근!</h1>
        <h2 className="mt-3 text-lg">당근마켓에 어서오세요!</h2>
      </div>
      <div className=" w-full text-center">
        <LinkedButton href="/create-account" styleType="full">
          시작하기
        </LinkedButton>
        <div className="pt-5">
          <span className="block pb-1 text-sm">이미 계정이 있나요?</span>
          <LinkedButton href="/login" styleType="text">
            로그인
          </LinkedButton>
        </div>
      </div>
    </main>
  )
}
