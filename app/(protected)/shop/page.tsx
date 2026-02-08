"use client"

import type { Shop } from "@/components/ShopCard";
import { shopApiClientFetch } from "@/lib/shop-api-client";
import { DashboardClient } from "@/components/DashboardClient";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    shopApiClientFetch<{ data: Shop[] }>("/shop/my-shops")
      .then((res) => {
        setShops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return <DashboardClient shops={shops} userRole="shop" />;
}
