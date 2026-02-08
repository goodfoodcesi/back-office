"use client"

import { shopApiClientFetch } from "@/lib/shop-api-client";
import { AdminReviewView } from "@/components/AdminReviewView";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopApiClientFetch<{ data: any[] }>("/admin/shops")
      .then((res) => setShops(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (shopId: string) => {
    try {
      await shopApiClientFetch(`/admin/shops/${shopId}/approve`, { method: "POST" });
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (shopId: string, reason: string) => {
    try {
      await shopApiClientFetch(`/admin/shops/${shopId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestInfo = async (shopId: string, reason: string) => {
    try {
      await shopApiClientFetch(`/admin/shops/${shopId}/action-required`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <AdminReviewView
      shops={shops}
      onValidateShop={handleApprove}
      onRefuseShop={handleReject}
      onRequestInfo={handleRequestInfo}
    />
  );
}

