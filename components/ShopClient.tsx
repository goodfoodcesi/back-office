"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Shop } from "@/components/ShopCard";
import { ShopsView } from "@/components/ShopsView";
import { CreateShopModal } from "@/components/CreateShopModal";

export function ShopsClient({ shops }: { shops: Shop[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ShopsView
        shops={shops}
        onCreateShop={() => setOpen(true)}
        onShopClick={(id) => router.push(`/shop/shops/${id}`)}
      />

      <CreateShopModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
