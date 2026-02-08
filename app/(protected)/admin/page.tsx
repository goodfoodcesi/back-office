"use client"

import { shopApiClientFetch } from "@/lib/shop-api-client";
import { AdminReviewView } from "@/components/AdminReviewView";
import {
  approveShopAction,
  rejectShopAction,
  requestInfoShopAction,
} from "@/app/actions/admin/shop";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopApiClientFetch<{ data: any[] }>("/admin/shops")
      .then((res) => setShops(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <AdminReviewView
      shops={shops}
      onValidateShop={approveShopAction}
      onRefuseShop={rejectShopAction}
      onRequestInfo={requestInfoShopAction}
    />
  );
}

