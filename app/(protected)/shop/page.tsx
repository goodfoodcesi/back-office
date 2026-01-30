import type { Shop } from "@/components/ShopCard";
import { shopApiFetch } from "@/lib/shop-api";
import { DashboardClient } from "@/components/DashboardClient";

export default async function DashboardPage() {
  const res = await shopApiFetch<{ data: Shop[] }>("/shop/my-shops");
  const shops = res.data;
  return <DashboardClient shops={shops} userRole="shop" />;
}
