import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { ShopCard, Shop } from "./ShopCard";
import { AdminActionModal } from "./AdminActionModal";

interface AdminReviewViewProps {
  shops: Shop[];
  onValidateShop: (shopId: string, message?: string) => void;
  onRefuseShop: (shopId: string, message: string) => void;
  onRequestInfo: (shopId: string, message: string) => void;
}

export function AdminReviewView({
  shops,
  onValidateShop,
  onRefuseShop,
  onRequestInfo,
}: AdminReviewViewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "validated" | "refused">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [currentAction, setCurrentAction] = useState<"validate" | "refuse" | "request-info" | null>(null);

  const filteredShops = shops.filter((shop) => {
    const matchesTab = activeTab === "all" || shop.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = [
    {
      id: "pending" as const,
      label: "En attente",
      count: shops.filter((s) => s.status === "pending").length,
    },
    { id: "all" as const, label: "Tous", count: shops.length },
    {
      id: "validated" as const,
      label: "Validés",
      count: shops.filter((s) => s.status === "validated").length,
    },
    {
      id: "refused" as const,
      label: "Refusés",
      count: shops.filter((s) => s.status === "refused").length,
    },
  ];

  const handleAction = (shop: Shop, action: "validate" | "refuse" | "request-info") => {
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
        {[
          {
            label: "En attente",
            value: shops.filter((s) => s.status === "pending").length,
            color: "#FFBF00",
          },
          {
            label: "Total shops",
            value: shops.length,
            color: "#1f1f1f",
          },
          {
            label: "Validés",
            value: shops.filter((s) => s.status === "validated").length,
            color: "#22c55e",
          },
          {
            label: "Refusés",
            value: shops.filter((s) => s.status === "refused").length,
            color: "#ef4444",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[12px] p-[20px] shadow-sm">
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
