import { shopApiFetch } from "@/lib/shop-api";
import { mapApiShopToUiShop } from "@/lib/shop-mapper";
import { ShopsClient } from "@/components/ShopClient";
import type { Shop } from "@/components/ShopCard";

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

export default async function ShopPage() {
  const res = await shopApiFetch<{ data: ApiShop[] }>("/shop/my-shops");
  const shops: Shop[] = res.data.map(mapApiShopToUiShop);

  return <ShopsClient shops={shops} />;
}
