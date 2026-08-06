import {betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../app/generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { PrismaNeon } from "@prisma/adapter-neon";
// import {Resend} from "resend";
// import { VerifyEmailTemplate } from "@/components/email/verify-email";
// const resend = new Resend(process.env.RESEND_API_KEY as string)
const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL })
});
export const auth = betterAuth({
    database: prismaAdapter(prisma, {provider: "postgresql"}),
    
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        },
    },
    plugins: [nextCookies()]
})