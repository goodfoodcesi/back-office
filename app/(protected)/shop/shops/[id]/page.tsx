"use client"

import { shopApiClientFetch } from "@/lib/shop-api-client";
import type { ApiShopDetails } from "@/types/shop";
import { ShopDetailsClient } from "@/components/ShopDetailsClient";
import { MenuItemApi } from "@/types/menus";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ShopDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [shop, setShop] = useState<ApiShopDetails | null>(null);
  const [menus, setMenus] = useState<MenuItemApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      shopApiClientFetch<{ data: ApiShopDetails }>(`/shop/${id}`),
      shopApiClientFetch<{ data: MenuItemApi[] }>(`/menus/manager/by-shop/${id}`)
    ])
      .then(([shopRes, menusRes]) => {
        setShop(shopRes.data);
        setMenus(menusRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !shop) return <p>Chargement...</p>;

  return <ShopDetailsClient shop={shop} menus={menus} />;
}
