import { shopApiFetch } from "@/lib/shop-api";
import { AdminReviewView } from "@/components/AdminReviewView";
import {
  approveShopAction,
  rejectShopAction,
  requestInfoShopAction,
} from "@/app/actions/admin/shop";

export default async function AdminPage() {
  const res = await shopApiFetch<{ data: any[] }>("/admin/shops");
  const shops = res.data;

  return (
    <AdminReviewView
      shops={shops}
      onValidateShop={approveShopAction}
      onRefuseShop={rejectShopAction}
      onRequestInfo={requestInfoShopAction}
    />
  );
}

