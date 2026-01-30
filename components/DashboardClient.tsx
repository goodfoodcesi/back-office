"use client";

import { useState } from "react";
import { DashboardView } from "@/components/DashboardView";
import type { Shop } from "@/components/ShopCard";
import { CreateShopModal } from "@/components/CreateShopModal";

export function DashboardClient({ shops, userRole }: { shops: Shop[]; userRole: "shop" | "admin" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardView
        shops={shops}
        userRole={userRole}
        onCreateShop={() => setOpen(true)}   // ✅ ouvre la modal seulement
      />

      <CreateShopModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
