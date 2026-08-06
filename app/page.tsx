import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Next.js Auth
            <span className="block text-2xl md:text-3xl font-light text-muted-foreground mt-1">
              Better Auth + Neon DB
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Production-ready boilerplate with App Router, TypeScript, and authentication.
          </p>
        </div>

        <Separator className="max-w-xs mx-auto" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login">
            <Button className="w-full sm:w-auto min-w-[140px] h-10">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="w-full sm:w-auto min-w-[140px] h-10">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground pt-4">
          Next.js · TypeScript · Better Auth · Neon DB
        </p>
      </div>
    </div>
  );
}