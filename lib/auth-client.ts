import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
    plugins: [
        nextCookies(),
        inferAdditionalFields({
            user: {
                userType: { type: "string" },
            },
        }),
    ],
})