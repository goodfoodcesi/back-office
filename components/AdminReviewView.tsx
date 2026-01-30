"use client";

import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { ShopCard, type Shop } from "./ShopCard";
import { AdminActionModal } from "./AdminActionModal";

// ✅ adapte aux status backend
type ShopStatus =
  | "draft"
  | "pending_validation"
  | "action_required"
  | "validated"
  | "visible"
  | "hidden"
  | "rejected";

interface AdminReviewViewProps {
  shops: Shop[]; // Shop doit avoir au moins { id, name, category?, status }
  onValidateShop: (shopId: string, message?: string) => void; // -> validated
  onRefuseShop: (shopId: string, message: string) => void; // -> rejected
  onRequestInfo: (shopId: string, message: string) => void; // -> action_required
}

export function AdminReviewView({
  shops,
  onValidateShop,
  onRefuseShop,
  onRequestInfo,
}: AdminReviewViewProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending_validation" | "action_required" | "validated" | "rejected"
  >("pending_validation");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [currentAction, setCurrentAction] = useState<
    "validate" | "refuse" | "request-info" | null
  >(null);

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const status = shop.status as ShopStatus;

      const matchesTab = activeTab === "all" ? true : status === activeTab;

      const matchesSearch =
        searchQuery === "" ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (shop.category ?? "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [shops, activeTab, searchQuery]);

  const tabs = useMemo(() => {
    return [
      {
        id: "pending_validation" as const,
        label: "En attente",
        count: shops.filter(
          (s) => (s.status as ShopStatus) === "pending_validation",
        ).length,
      },
      {
        id: "action_required" as const,
        label: "Action requise",
        count: shops.filter(
          (s) => (s.status as ShopStatus) === "action_required",
        ).length,
      },
      { id: "all" as const, label: "Tous", count: shops.length },
      {
        id: "validated" as const,
        label: "Validés",
        count: shops.filter((s) => (s.status as ShopStatus) === "validated")
          .length,
      },
      {
        id: "rejected" as const,
        label: "Refusés",
        count: shops.filter((s) => (s.status as ShopStatus) === "rejected")
          .length,
      },
    ];
  }, [shops]);

  const stats = useMemo(() => {
    return [
      {
        label: "En attente",
        value: shops.filter(
          (s) => (s.status as ShopStatus) === "pending_validation",
        ).length,
        color: "#FFBF00",
      },
      {
        label: "Total shops",
        value: shops.length,
        color: "#1f1f1f",
      },
      {
        label: "Validés",
        value: shops.filter((s) => (s.status as ShopStatus) === "validated")
          .length,
        color: "#22c55e",
      },
      {
        label: "Refusés",
        value: shops.filter((s) => (s.status as ShopStatus) === "rejected")
          .length,
        color: "#ef4444",
      },
    ];
  }, [shops]);

  const handleAction = (
    shop: Shop,
    action: "validate" | "refuse" | "request-info",
  ) => {
    setSelectedShop(shop);
    setCurrentAction(action);
  };

  const handleConfirmAction = (message?: string) => {
    if (!selectedShop) return;

    if (currentAction === "validate") {
      onValidateShop(selectedShop.id, message);
    } else if (currentAction === "refuse") {
      onRefuseShop(selectedShop.id, message || "");
    } else if (currentAction === "request-info") {
      onRequestInfo(selectedShop.id, message || "");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-[32px]">
        <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
          Valider les shops
        </h1>
        <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
          Gérez les demandes de validation des shops
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-[12px] mb-[24px]">
        <div className="relative flex-1">
          <Search className="absolute left-[12px] top-[50%] translate-y-[-50%] w-[20px] h-[20px] text-[#6b7280]" />
          <input
            type="text"
            placeholder="Rechercher un shop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-[#e8e8e8] rounded-[12px] pl-[44px] pr-[16px] py-[12px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
          />
        </div>
        <button className="bg-white border-2 border-[#e8e8e8] rounded-[12px] px-[16px] py-[12px] flex items-center gap-[8px] hover:border-[#FFBF00] transition-colors">
          <Filter className="w-[20px] h-[20px] text-[#6b7280]" />
          <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Filtres
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] mb-[24px]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-[12px] p-[20px] shadow-sm"
          >
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[8px]">
              {stat.label}
            </p>
            <p
              className="font-['Space_Grotesk'] text-[32px]"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-[8px] mb-[24px] border-b border-[#e5e7eb] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-[20px] py-[12px] font-['Space_Grotesk'] text-[14px] whitespace-nowrap
              border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? "border-[#FFBF00] text-[#1f1f1f]"
                  : "border-transparent text-[#6b7280] hover:text-[#1f1f1f]"
              }
            `}
          >
            {tab.label}
            <span
              className={`
                ml-[8px] px-[8px] py-[2px] rounded-full text-[12px]
                ${
                  activeTab === tab.id
                    ? "bg-[#FFBF00] text-[#1f1f1f]"
                    : "bg-[#f3f4f6] text-[#6b7280]"
                }
              `}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Shops Grid */}
      {filteredShops.length === 0 ? (
        <div className="bg-white rounded-[12px] p-[48px] text-center">
          <div className="max-w-[400px] mx-auto">
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              {searchQuery
                ? "Aucun shop ne correspond à votre recherche"
                : "Aucun shop à valider pour le moment"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {filteredShops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              showAdminActions
              onValidate={() => handleAction(shop, "validate")}
              onRefuse={() => handleAction(shop, "refuse")}
              onRequestInfo={() => handleAction(shop, "request-info")}
            />
          ))}
        </div>
      )}

      {/* Admin Action Modal */}
      <AdminActionModal
        isOpen={!!selectedShop && !!currentAction}
        onClose={() => {
          setSelectedShop(null);
          setCurrentAction(null);
        }}
        shop={selectedShop}
        action={currentAction}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}
