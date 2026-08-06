"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { signIn, signInSocial, signUp } from "@/lib/auth.actions"
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export const signupSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
  })
  export type SignupSchema = z.infer<typeof signupSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })


  const router = useRouter();

  type LoadingState = "email" | "google" | null;
  const [loading, setLoading] = useState<LoadingState>(null);
  

  const handleSocialAuth = async (provider: "google") => {
    setLoading("google");

    try {
      await signInSocial(provider);
    } catch (err) {
      // Ignore redirect-related errors
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        return;
      }
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to authenticate."
      );

    } finally {
      setLoading(null);
    }
  };

  const handleEmailAuth = async (values: SignupSchema) => {
    setLoading("email");

    try {
      const result = await signUp(values.name, values.email, values.password);

      if (!result?.user) {
        toast.error("Failed to create an account");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(null);;
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(handleEmailAuth)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                {...field}
                placeholder="John Doe"
                aria-invalid={fieldState.invalid}
                className="h-8"
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...field}
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
                className="h-8"
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
        <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                </div>

                <Input
                  id="password"
                  type="password"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-8"
                />

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
              
            )}
          />
        
        <Field>
            <Button
              type="submit"
              disabled={loading !== null}
              className="h-8"
            >
              {loading === "email" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {loading === "email" ? "Signing up..." : "Create Account"}
            </Button>
          </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
            <Button
              variant="outline"
              type="button"
              disabled={loading !== null}
              onClick={() => handleSocialAuth("google")}
              className="h-8"
            >
              {loading === "google" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              )}

              {loading === "google" ? "Signing up..." : "Sign up with Google"}
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <a href="login" className="underline underline-offset-4">
                Sign in
              </a>
            </FieldDescription>
          </Field>
      </FieldGroup>
    </form>
  )
}
