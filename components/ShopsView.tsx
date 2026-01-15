import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ShopCard, Shop } from "./ShopCard";
import { CreateShopModal } from "./CreateShopModal";

interface ShopsViewProps {
  shops: Shop[];
  onCreateShop: (shop: Omit<Shop, "id" | "status" | "createdAt">) => void;
  onShopClick?: (shopId: string) => void;
}

export function ShopsView({ shops, onCreateShop, onShopClick }: ShopsViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "validated" | "pending" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = shops.filter((shop) => {
    const matchesTab = activeTab === "all" || shop.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: "all" as const, label: "Tous", count: shops.length },
    {
      id: "validated" as const,
      label: "Validés",
      count: shops.filter((s) => s.status === "validated").length,
    },
    {
      id: "pending" as const,
      label: "En attente",
      count: shops.filter((s) => s.status === "pending").length,
    },
    {
      id: "draft" as const,
      label: "Brouillon",
      count: shops.filter((s) => s.status === "draft").length,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-[32px]">
        <div className="flex items-center justify-between mb-[16px]">
          <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f]">
            Mes shops
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#1f1f1f] text-white px-[20px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors flex items-center gap-[8px]"
          >
            <Plus className="w-[20px] h-[20px]" />
            Créer un shop
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-[12px] top-[50%] translate-y-[-50%] w-[20px] h-[20px] text-[#6b7280]" />
          <input
            type="text"
            placeholder="Rechercher un shop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-[#e8e8e8] rounded-[12px] pl-[44px] pr-[16px] py-[12px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] mb-[24px]">
        {[
          { label: "Total shops", value: shops.length },
          { label: "Validés", value: shops.filter((s) => s.status === "validated").length },
          { label: "En attente", value: shops.filter((s) => s.status === "pending").length },
          { label: "Brouillon", value: shops.filter((s) => s.status === "draft").length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[8px]">
              {stat.label}
            </p>
            <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f]">
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
            <div className="bg-[#f3f4f6] w-[80px] h-[80px] rounded-[16px] flex items-center justify-center mx-auto mb-[16px]">
              <Plus className="w-[40px] h-[40px] text-[#6b7280]" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f] mb-[8px]">
              Aucun shop trouvé
            </h3>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[24px]">
              {searchQuery
                ? "Aucun shop ne correspond à votre recherche"
                : "Créez votre premier shop pour commencer"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#1f1f1f] text-white px-[24px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors"
              >
                Créer un shop
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} onClick={onShopClick} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateShopModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(shopData) => {
          onCreateShop(shopData);
        }}
      />
    </div>
  );
}