"use server"
import { cookies, headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL;

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  cookieHeader?: string; // Optional cookie header from client
};

export async function shopApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  // Try to get cookies from multiple sources in order of preference:
  // 1. Explicitly provided cookieHeader
  // 2. Request headers (for Server Actions called from client)
  // 3. Server cookies (fallback)
  let cookieHeader = options.cookieHeader;
  let cookieSource = "none";

  if (cookieHeader) {
    cookieSource = "explicit";
  } else {
    try {
      const headersList = await headers();
      cookieHeader = headersList.get("cookie") || "";
      cookieSource = cookieHeader ? "headers" : "headers-empty";
    } catch {
      // If headers() fails, fallback to cookies()
      cookieHeader = (await cookies()).toString();
      cookieSource = cookieHeader ? "cookies" : "cookies-empty";
    }
  }

  console.log(`[shopApiFetch] ${path} - source: ${cookieSource}, hasCookie: ${!!cookieHeader}`);


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
