"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export type CreateShopState = {
  ok: boolean;
  error: string;
};

export async function createShopAction(
  _prevState: CreateShopState,
  formData: FormData
): Promise<CreateShopState> {
  try {
    const payload = {
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      address: String(formData.get("address") ?? ""),
      category: String(formData.get("category") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
    };

    if (Object.values(payload).some((v) => !v)) {
      return { ok: false, error: "Tous les champs sont obligatoires." };
    }

    await shopApiFetch("/shop", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    revalidatePath("/shop/shops");
    return { ok: true, error: "" };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur serveur",
    };
  }
}

export async function submitShopForValidationAction(formData: FormData) {
  const shopId = formData.get("shopId") as string;

  if (!shopId) throw new Error("Missing shopId");

  await shopApiFetch(`/shop/${shopId}/submit`, {
    method: "POST",
  });

  revalidatePath(`/shop/shops/${shopId}`);
}