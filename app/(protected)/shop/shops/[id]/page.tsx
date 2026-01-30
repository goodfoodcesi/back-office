import { shopApiFetch } from "@/lib/shop-api";
import type { ApiShopDetails } from "@/types/shop";
import { ShopDetailsClient } from "@/components/ShopDetailsClient";
import { MenuItemApi } from "@/types/menus";

export default async function ShopDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await shopApiFetch<{ data: ApiShopDetails }>(`/shop/${id}`);
  const menusRes = await shopApiFetch<{ data: MenuItemApi[] }>(`/menus/manager/by-shop/${id}`);

  return <ShopDetailsClient shop={res.data} menus={menusRes.data} />;
}
