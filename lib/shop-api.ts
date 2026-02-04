"use server"
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL;

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function shopApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Cookie: cookieHeader,
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
