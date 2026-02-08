import { authClient } from "@/lib/auth-client";

export async function getCurrentUser() {
  const result = await authClient.getSession();

  if (result.error) {
    return null;
  }

  return result.data?.user ?? null;
}
