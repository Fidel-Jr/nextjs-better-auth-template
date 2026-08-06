import { Waves } from "lucide-react"

import { SignupForm } from "./signup-form"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Logo } from "@/components/logo"

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden p-6 md:p-10">
    

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <a href="#" className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brown-600 text-white shadow-lg shadow-orange-500/20">
            <Waves className="size-5" />
          </a>
          <Logo />
          <p className="text-sm text-zinc-400">Sign in to manage your full stack project</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Manage and Track your development
        </p>
      </div>
    </div>
  )
}