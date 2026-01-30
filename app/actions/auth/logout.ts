"use server";

import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieHeader = (await cookies()).toString();

  await authClient.signOut({
    fetchOptions: {
      headers: {
        cookie: cookieHeader,
      },
    },
  });
}
