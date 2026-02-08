"use client"

import { shopApiClientFetch } from "@/lib/shop-api-client";
import { mapApiShopToUiShop } from "@/lib/shop-mapper";
import { ShopsClient } from "@/components/ShopClient";
import type { Shop } from "@/components/ShopCard";
import { useEffect, useState } from "react";

type ApiShop = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  status: string;
  coverImage?: string | null;
  logo?: string | null;
  createdAt: string;
};

export default function ShopPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopApiClientFetch<{ data: ApiShop[] }>("/shop/my-shops")
      .then((res) => setShops(res.data.map(mapApiShopToUiShop)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return <ShopsClient shops={shops} />;
}
