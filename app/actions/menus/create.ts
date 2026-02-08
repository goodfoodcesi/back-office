"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";
import type { MenuOption } from "@/types/menus";

export async function createMenuAction(
  shopId: string,
  payload: {
    name: string;
    description?: string;
    category: string;
    price: string;
    stock?: number;
    options?: MenuOption[];
  }
) {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch("/menus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shopId,
      ...payload,
    }),
    cookieHeader,
  });

  revalidatePath(`/shop/shops/${shopId}`);
}
