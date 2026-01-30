import type { Shop } from "@/components/ShopCard";
import { ShopStatus } from "@/types/shop";

type ApiShop = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  status: string;
  coverImage?: string | null;
  logo?: string | null;
  createdAt: string | Date;

};



export function mapApiShopToUiShop(s: ApiShop): Shop {
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? "",
    address: s.address,
    status: (s.status as ShopStatus) ?? "draft" ,
    coverImage: s.coverImage ?? s.logo ?? "https://via.placeholder.com/800x400?text=Shop",
    logo: "https://via.placeholder.com/800x400?text=Shop",
    createdAt: typeof s.createdAt === "string" ? s.createdAt : s.createdAt.toISOString(),
    category: "Restaurant",
  };
}
