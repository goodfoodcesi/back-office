"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export async function approveShopAction(shopId: string) {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch(`/admin/shops/${shopId}/approve`, { method: "POST", cookieHeader });
  revalidatePath("/admin");
}

export async function rejectShopAction(shopId: string, reason: string) {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch(`/admin/shops/${shopId}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
    cookieHeader,
  });
  revalidatePath("/admin");
}

export async function requestInfoShopAction(shopId: string, reason: string) {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch(`/admin/shops/${shopId}/action-required`, {
    method: "POST",
    body: JSON.stringify({ reason }),
    cookieHeader,
  });
  revalidatePath("/admin");
}
