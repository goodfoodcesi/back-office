import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields } from "better-auth/client/plugins";

const baseURL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

if (!baseURL) {
    console.error("❌ NEXT_PUBLIC_AUTH_BASE_URL n'est pas définie !");
}

console.log("🔧 Auth Client - baseURL:", baseURL);

export const authClient =  createAuthClient({
    baseURL: baseURL,
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        nextCookies(),
        inferAdditionalFields({
            user: {
                userType: { type: "string" },
            },
        }),
    ],
})