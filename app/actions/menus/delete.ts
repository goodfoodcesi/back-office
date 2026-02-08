"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export async function deleteMenuAction(menuId: string, shopId: string): Promise<void> {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch(`/menus/${menuId}`, { method: "DELETE", cookieHeader });
  revalidatePath(`/shop/shops/${shopId}`);
}
