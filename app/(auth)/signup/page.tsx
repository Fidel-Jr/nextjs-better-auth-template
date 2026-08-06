import { Waves } from "lucide-react"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SignupForm } from "./signup-form"

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden p-6 md:p-10">

      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">

        <div className="rounded-2xl p-6 shadow-sm shadow-black/20 sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Next.js, Better-Auth and Neon DB
        </p>
      </div>
    </div>
  )
}