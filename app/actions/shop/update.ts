"use server";

import { revalidatePath } from "next/cache";
import { shopApiFetch } from "@/lib/shop-api";

export type UpdateShopState = {
  ok: boolean;
  error: string;
};

export async function updateShopAction(
  shopId: string,
  _prevState: UpdateShopState,
  formData: FormData
): Promise<UpdateShopState> {
  try {
    const payload: any = {};

    const name = String(formData.get("name") ?? "").trim();
    if (name) payload.name = name;

    const description = String(formData.get("description") ?? "").trim();
    if (description) payload.description = description;

    const email = String(formData.get("email") ?? "").trim();
    if (email) payload.email = email;

    const phone = String(formData.get("phone") ?? "").trim();
    if (phone) payload.phone = phone;

    const address = String(formData.get("address") ?? "").trim();
    if (address) payload.address = address;

    const city = String(formData.get("city") ?? "").trim();
    if (city) payload.city = city;

    const zipCode = String(formData.get("zipCode") ?? "").trim();
    if (zipCode) payload.zipCode = zipCode;

    const country = String(formData.get("country") ?? "").trim();
    if (country) payload.country = country;

    const siret = String(formData.get("siret") ?? "").trim();
    if (siret) payload.siret = siret;

    const prepTimeRaw = String(formData.get("prepTime") ?? "").trim();
    if (prepTimeRaw) {
      const n = Number(prepTimeRaw);
      if (!Number.isNaN(n)) payload.prepTime = n;
    }

    const scheduleJson = String(formData.get("scheduleJson") ?? "").trim();
    if (scheduleJson) {
      payload.schedule = JSON.parse(scheduleJson);
    }


    await shopApiFetch(`/shop/${shopId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });


    revalidatePath("/shop/dashboard");
    revalidatePath("/shop/shops");
    revalidatePath(`/shop/shops/${shopId}`);

    return { ok: true, error: "" };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Erreur lors de la mise à jour" };
  }
}
