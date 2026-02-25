"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApiShopDetails, ApiWeekSchedule } from "@/types/shop";
import type { MenuItemApi, MenuOption } from "@/types/menus";
import { ShopMenus } from "@/components/ShopMenus";
import { TimeField } from "@/components/TimeField";
import { shopApiClientFetch } from "@/lib/shop-api-client";
import { toast } from "sonner";

function dayLabel(k: keyof ApiWeekSchedule) {
  return {
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
  }[k];
}

const daysOrder: (keyof ApiWeekSchedule)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function ShopDetailsClient({
  shop,
  menus,
}: {
  shop: ApiShopDetails;
  menus: MenuItemApi[];
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [schedule, setSchedule] = useState<ApiWeekSchedule>(
    () => shop.schedule ?? ({} as ApiWeekSchedule),
  );
  const [activeTab, setActiveTab] = useState<
    "general" | "schedule" | "menus"
  >("general");

  const uiMenus = React.useMemo(
    () =>
      menus.map((m) => ({
        id: m.id,
        name: m.name,
        description: m.description ?? "",
        price: Number(m.price ?? 0),
        category: m.category ?? "",
        available: m.isPublished,
        imageUrl: m.imageUrl ?? "",
        _stock: m.stock ?? 0,
        _options: (m.options ?? []) as MenuOption[],
      })),
    [menus],
  );

  const handleGeneralUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const payload: any = {};

      const name = String(formData.get("name") ?? "").trim();
      if (name) payload.name = name;

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

      await shopApiClientFetch(`/shop/${shop.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Informations mises à jour");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour");
    } finally {
      setUpdating(false);
    }
  };

  const handleScheduleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await shopApiClientFetch(`/shop/${shop.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule }),
      });

      toast.success("Horaires mis à jour");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour");
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmitForValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await shopApiClientFetch(`/shop/${shop.id}/submit`, {
        method: "POST",
      });

      toast.success("Shop soumis à validation");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la soumission");
    } finally {
      setUpdating(false);
    }
  };

  const handleMenusUpdate = async (nextMenus: any[]) => {
    const existingIds = new Set(menus.map((m) => m.id));

    try {
      // 1. Create new menus
      for (const menu of nextMenus) {
        if (!menu.id || !existingIds.has(menu.id)) {
          // Create new menu
          const createRes = await shopApiClientFetch("/menus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              shopId: shop.id,
              name: menu.name,
              description: menu.description,
              category: menu.category,
              price: String(menu.price),
              stock: menu._stock ?? 0,
              options: menu._options ?? [],
              imageUrl: menu.imageUrl || undefined,
            }),
          });

          // If created successfully and should be available, publish it
          const res = createRes as any;
          if (res && res.data && res.data.id && menu.available) {
             await shopApiClientFetch(`/menus/${res.data.id}/publish`, {
              method: "POST",
            });
          }
          continue;
        }

        // 2. Update existing menus
        const original = menus.find((m) => m.id === menu.id);
        if (!original) continue;

        // Check Availability (isPublished)
        if (menu.available !== original.isPublished) {
          if (menu.available) {
            await shopApiClientFetch(`/menus/${menu.id}/publish`, { method: "POST" });
          } else {
            await shopApiClientFetch(`/menus/${menu.id}/unpublish`, { method: "POST" });
          }
        }

        // Check Content Changes
        const contentChanged =
          original.name !== menu.name ||
          original.description !== menu.description ||
          original.category !== menu.category ||
          Number(original.price) !== Number(menu.price) ||
          Number(original.stock) !== Number(menu._stock);

        if (contentChanged) {
          await shopApiClientFetch(`/shop/${shop.id}/menus/${menu.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: menu.name,
              description: menu.description,
              category: menu.category,
              price: String(menu.price),
              stock: menu._stock,
              options: menu._options ?? [],
              imageUrl: menu.imageUrl || undefined,
            }),
          });
        }
      }

      // Delete removed menus
      for (const m of menus) {
        if (!nextMenus.find((nm) => nm.id === m.id)) {
          await shopApiClientFetch(`/menus/${m.id}`, {
            method: "DELETE",
          });
        }
      }

      toast.success("Menus mis à jour");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour des menus");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="text-sm underline text-gray-600"
        >
          Retour
        </button>
        <h1 className="text-2xl font-bold">{shop.name}</h1>
        <p className="text-sm text-gray-600">
          Statut: <span className="font-medium">{shop.status}</span>
        </p>
      </div>

      <div className="flex gap-2 border-b">
        <TabButton
          active={activeTab === "general"}
          onClick={() => setActiveTab("general")}
        >
          Infos générales
        </TabButton>
        <TabButton
          active={activeTab === "schedule"}
          onClick={() => setActiveTab("schedule")}
        >
          Horaires
        </TabButton>
        <TabButton
          active={activeTab === "menus"}
          onClick={() => setActiveTab("menus")}
        >
          Menus
        </TabButton>
      </div>

      {activeTab === "general" && (
        <>
          {/* FORM UPDATE SHOP */}
          <form
            onSubmit={handleGeneralUpdate}
            className="bg-white border rounded-xl p-6 space-y-4"
          >
            <Field label="Nom" name="name" defaultValue={shop.name ?? ""} required />
            <Field label="Email" name="email" defaultValue={shop.email ?? ""} />
            <Field label="Téléphone" name="phone" defaultValue={shop.phone ?? ""} />
            <Field label="Adresse" name="address" defaultValue={shop.address ?? ""} />
            <Field label="Ville" name="city" defaultValue={shop.city ?? ""} />
            <Field label="Code postal" name="zipCode" defaultValue={shop.zipCode ?? ""} />

            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              {updating ? "Enregistrement…" : "Enregistrer"}
            </button>
          </form>

          {/* FORM SUBMIT FOR VALIDATION */}
          {(shop.status === "draft" || shop.status === "action_required") && (
            <form
              onSubmit={handleSubmitForValidation}
              className="mt-4"
            >
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 bg-[#FFBF00] text-black rounded font-medium disabled:opacity-50"
              >
                Soumettre à validation
              </button>
            </form>
          )}
        </>
      )}

      {activeTab === "schedule" && (
        <form
          onSubmit={handleScheduleUpdate}
          className="bg-white border rounded-xl p-6 space-y-6"
        >
          {daysOrder.map((day) => {
            const d = schedule[day] ?? { isOpen: false };

            return (
              <div key={day} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{dayLabel(day)}</p>

                  <button
                    type="button"
                    onClick={() =>
                      setSchedule((prev) => ({
                        ...prev,
                        [day]: d.isOpen
                          ? { isOpen: false }
                          : {
                              isOpen: true,
                              openMorning: "11:00",
                              closeMorning: "14:00",
                              openEvening: "18:00",
                              closeEvening: "22:00",
                            },
                      }))
                    }
                    className="text-sm underline"
                  >
                    {d.isOpen ? "Fermer" : "Ouvrir"}
                  </button>
                </div>

                {d.isOpen && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <TimeField
                      label="Ouverture midi"
                      value={d.openMorning ?? ""}
                      onChange={(v) =>
                        setSchedule((s) => ({
                          ...s,
                          [day]: { ...d, openMorning: v },
                        }))
                      }
                    />
                    <TimeField
                      label="Fermeture midi"
                      value={d.closeMorning ?? ""}
                      onChange={(v) =>
                        setSchedule((s) => ({
                          ...s,
                          [day]: { ...d, closeMorning: v },
                        }))
                      }
                    />
                    <TimeField
                      label="Ouverture soir"
                      value={d.openEvening ?? ""}
                      onChange={(v) =>
                        setSchedule((s) => ({
                          ...s,
                          [day]: { ...d, openEvening: v },
                        }))
                      }
                    />
                    <TimeField
                      label="Fermeture soir"
                      value={d.closeEvening ?? ""}
                      onChange={(v) =>
                        setSchedule((s) => ({
                          ...s,
                          [day]: { ...d, closeEvening: v },
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {updating ? "Enregistrement…" : "Enregistrer les horaires"}
          </button>
        </form>
      )}

      {activeTab === "menus" && (
        <div className="bg-white border rounded-xl p-6">
          <ShopMenus menus={uiMenus as any} onUpdate={handleMenusUpdate} />
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border-b-2 ${
        active ? "border-black font-medium" : "border-transparent text-gray-500"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full border rounded p-2"
      />
    </div>
  );
}
