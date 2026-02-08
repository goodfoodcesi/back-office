"use server"
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL;

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  cookieHeader?: string; // Optional cookie header from client
};

export async function shopApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  // Use provided cookieHeader or fallback to server cookies
  const cookieHeader = options.cookieHeader || (await cookies()).toString();

  const { cookieHeader: _, ...fetchOptions } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.headers ?? {}),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
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
