"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  updateShopAction,
  type UpdateShopState,
} from "@/app/actions/shop/update";
import type { ApiShopDetails, ApiWeekSchedule } from "@/types/shop";
import type { MenuItemApi, MenuOption } from "@/types/menus";
import { ShopMenus } from "@/components/ShopMenus";
import { createMenuAction } from "@/app/actions/menus/create";
import { updateMenuAction } from "@/app/actions/menus/update";
import { deleteMenuAction } from "@/app/actions/menus/delete";
import { TimeField } from "@/components/TimeField";
import { submitShopForValidationAction } from "@/app/actions/shop/action";

const initialUpdateState: UpdateShopState = { ok: false, error: "" };

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

  const boundUpdate = React.useMemo(
    () => updateShopAction.bind(null, shop.id),
    [shop.id],
  );
  const [updateState, updateFormAction, updating] = React.useActionState(
    boundUpdate,
    initialUpdateState,
  );

  const [schedule, setSchedule] = React.useState<ApiWeekSchedule>(
    () => shop.schedule ?? ({} as ApiWeekSchedule),
  );
  const [activeTab, setActiveTab] = React.useState<
    "general" | "schedule" | "menus"
  >("general");

  React.useEffect(() => {
    if (updateState.ok) router.refresh();
  }, [updateState.ok, router]);

  const uiMenus = React.useMemo(
    () =>
      menus.map((m) => ({
        id: m.id,
        name: m.name,
        description: m.description ?? "",
        price: Number(m.price ?? 0),
        category: m.category ?? "",
        available: (m.stock ?? 0) > 0,
        _stock: m.stock ?? 0,
        _options: (m.options ?? []) as MenuOption[],
      })),
    [menus],
  );

  const handleMenusUpdate = async (nextMenus: any[]) => {
    const existingIds = new Set(menus.map((m) => m.id));

    for (const menu of nextMenus) {
      if (!menu.id || !existingIds.has(menu.id)) {
        await createMenuAction(shop.id, {
          name: menu.name,
          description: menu.description,
          category: menu.category,
          price: String(menu.price),
          stock: menu.available ? (menu._stock ?? 0) : 0,
          options: menu._options ?? [],
        });
        continue;
      }

      const original = menus.find((m) => m.id === menu.id);
      if (!original) continue;

      const changed =
        original.name !== menu.name ||
        original.description !== menu.description ||
        original.category !== menu.category ||
        Number(original.price) !== Number(menu.price) ||
        Number(original.stock) !== Number(menu._stock);

      if (changed) {
        await updateMenuAction(menu.id, shop.id, {
          name: menu.name,
          description: menu.description,
          category: menu.category,
          price: String(menu.price),
          stock: menu.available ? (menu._stock ?? 0) : 0,
          options: menu._options ?? [],
        });
      }
    }

    for (const m of menus) {
      if (!nextMenus.find((nm) => nm.id === m.id)) {
        await deleteMenuAction(m.id, shop.id);
      }
    }

    router.refresh();
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
      action={updateFormAction}
      className="bg-white border rounded-xl p-6 space-y-4"
    >
      <input
        type="hidden"
        name="scheduleJson"
        value={JSON.stringify(schedule)}
      />

      <Field label="Nom" name="name" defaultValue={shop.name ?? ""} required />
      <Field label="Email" name="email" defaultValue={shop.email ?? ""} />
      <Field label="Téléphone" name="phone" defaultValue={shop.phone ?? ""} />
      <Field label="Adresse" name="address" defaultValue={shop.address ?? ""} />
      <Field label="Ville" name="city" defaultValue={shop.city ?? ""} />
      <Field label="Code postal" name="zipCode" defaultValue={shop.zipCode ?? ""} />

      <button
        disabled={updating}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {updating ? "Enregistrement…" : "Enregistrer"}
      </button>

      {updateState.error && (
        <p className="text-red-600">{updateState.error}</p>
      )}
    </form>

    {/* FORM SUBMIT FOR VALIDATION */}
    {(shop.status === "draft" || shop.status === "action_required") && (
      <form
        action={submitShopForValidationAction}
        className="mt-4"
      >
        <input type="hidden" name="shopId" value={shop.id} />

        <button
          type="submit"
          className="px-4 py-2 bg-[#FFBF00] text-black rounded font-medium"
        >
          Soumettre à validation
        </button>
      </form>
    )}
  </>
)}


      {activeTab === "schedule" && (
        <form
          action={updateFormAction}
          className="bg-white border rounded-xl p-6 space-y-6"
        >
          <input
            type="hidden"
            name="scheduleJson"
            value={JSON.stringify(schedule)}
          />

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
            disabled={updating}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Enregistrer les horaires
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
