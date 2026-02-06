"use server";

import { cookies } from "next/headers";

export type CreateShopState = {
  ok: boolean;
  error: string;
};

const initialError = (msg: string): CreateShopState => ({ ok: false, error: msg });

/**
 * Server Action: crée un shop via shop-api en envoyant un Bearer JWT (Better Auth).
 * Attendu côté form:
 *  - name
 *  - description
 *  - address
 *  - category
 *  - imageUrl
 *
 * ⚠️ Adapte le payload si ton shop-api attend un DTO plus complet (email, phone, schedule, etc.)
 */
export async function createShopAction(
  _prev: CreateShopState,
  form: FormData
): Promise<CreateShopState> {
  // 1) Récupérer un JWT côté serveur (ne JAMAIS le faire côté client)
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // 2) Lire les champs du form
  const name = String(form.get("name") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const address = String(form.get("address") ?? "").trim();
  const category = String(form.get("category") ?? "").trim();
  const imageUrl = String(form.get("imageUrl") ?? "").trim();

  if (!name || !description || !address || !category || !imageUrl) {
    return initialError("Veuillez remplir tous les champs requis.");
  }

  // 3) Construire le payload pour shop-api (adapte si besoin)
  const payload = { name, description, address, category, imageUrl };

  // 4) Appeler shop-api
  const baseUrl = process.env.SHOP_API_URL; // ex: "http://ip_shop_api"
  if (!baseUrl) {
    return initialError("SHOP_API_URL manquant côté serveur.");
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/shops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return initialError("Impossible de contacter le shop-api.");
  }

  if (!res.ok) {
    // tentative de récupérer un message d'erreur JSON
    let message = `Erreur API (${res.status})`;
    try {
      const j = await res.json();
      message = j?.message ?? j?.error ?? message;
    } catch {}
    return initialError(message);
  }

  return { ok: true, error: "" };
}
