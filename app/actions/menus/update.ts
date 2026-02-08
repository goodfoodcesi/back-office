"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export async function updateMenuAction(
  menuId: string,
  shopId: string,
  data: {
    name: string;
    description?: string;
    category?: string;
    price: string;
    stock: number;
    options?: any[];
  }
) {
  const { cookies } = await import("next/headers");
  const cookieHeader = (await cookies()).toString();

  await shopApiFetch(`/shop/${shopId}/menus/${menuId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    cookieHeader,
  });

  revalidatePath(`/shop/shops/${shopId}`);
}
