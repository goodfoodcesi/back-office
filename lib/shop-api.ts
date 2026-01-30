"use server"
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL;
if (!BASE_URL) throw new Error("Missing SHOP_API_BASE_URL");

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

async function getBearerToken(): Promise<string> {
  const cookieHeader = (await cookies()).toString();

  const { data, error } = await authClient.token({
    fetchOptions: { headers: { cookie: cookieHeader } },
  });

  if (error || !data?.token) {
    throw new Error("Not authenticated (missing token)");
  }

  return data.token;
}
export async function shopApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const token = await getBearerToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`shop-api ${res.status}: ${text || res.statusText}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
