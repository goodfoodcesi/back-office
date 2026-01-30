import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";

export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "http://localhost:4000",
    plugins: [
        nextCookies(),
        jwtClient(),
        inferAdditionalFields({
            user: {
                userType: { type: "string" },
            },
        }),
    ],
})