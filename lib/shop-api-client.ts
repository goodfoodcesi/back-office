"use client"

import { shopApiFetch } from "./shop-api";

type ShopApiOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

/**
 * Client-side wrapper for shopApiFetch that automatically includes browser cookies
 * Use this in Client Components instead of calling shopApiFetch directly
 */
export async function shopApiClientFetch<T>(
  path: string,
  options: ShopApiOptions = {}
): Promise<T> {
  // Get cookies from browser
  const cookieHeader = document.cookie;
  
  // Call server action with cookies
  return shopApiFetch<T>(path, {
    ...options,
    cookieHeader,
  });
}
