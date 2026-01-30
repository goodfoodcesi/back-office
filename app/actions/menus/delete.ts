"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export async function deleteMenuAction(menuId: string, shopId: string): Promise<void> {
  await shopApiFetch(`/menus/${menuId}`, { method: "DELETE" });
  revalidatePath(`/shop/shops/${shopId}`);
}
