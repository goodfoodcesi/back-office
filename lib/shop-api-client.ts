"use client"

type ShopApiOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL;

/**
 * Client-side fetch for shop-api that automatically includes browser cookies
 * Use this in Client Components instead of shopApiFetch
 */
export async function shopApiClientFetch<T>(
  path: string,
  options: ShopApiOptions = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    credentials: "include", // Automatically send cookies
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
