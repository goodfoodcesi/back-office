import { useState } from "react";
import { X, Search } from "lucide-react";
import { Partner } from "./PartnersView";
import { Shop } from "./ShopCard";

interface ManagePartnerAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner;
  shops: Shop[];
  onUpdateAccess: (shopIds: string[]) => void;
}

export function ManagePartnerAccessModal({
  isOpen,
  onClose,
  partner,
  shops,
  onUpdateAccess,
}: ManagePartnerAccessModalProps) {
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>(partner.accessibleShops);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleShop = (shopId: string) => {
    setSelectedShopIds((prev) =>
      prev.includes(shopId)
        ? prev.filter((id) => id !== shopId)
        : [...prev, shopId]
    );
  };

  const handleSubmit = () => {
    onUpdateAccess(selectedShopIds);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[600px] w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-[#e5e7eb]">
          <div>
            <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
              Gérer les accès
            </h2>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mt-[4px]">
              {partner.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#1f1f1f] transition-colors"
          >
            <X className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Search */}
        <div className="p-[24px] pb-[16px] border-b border-[#e5e7eb]">
          <div className="relative">
            <Search className="absolute left-[12px] top-[50%] translate-y-[-50%] w-[20px] h-[20px] text-[#6b7280]" />
            <input
              type="text"
              placeholder="Rechercher un shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] pl-[44px] pr-[16px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
            />
          </div>
          <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280] mt-[8px]">
            {selectedShopIds.length} shop{selectedShopIds.length !== 1 ? "s" : ""} sélectionné{selectedShopIds.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Shop List */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          {filteredShops.length === 0 ? (
            <div className="text-center py-[40px]">
              <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                Aucun shop trouvé
              </p>
            </div>
          ) : (
            <div className="space-y-[8px]">
              {filteredShops.map((shop) => {
                const isSelected = selectedShopIds.includes(shop.id);
                const isValidated = shop.status === "validated";

                return (
                  <div
                    key={shop.id}
                    className={`
                      border-2 rounded-[8px] p-[12px] cursor-pointer transition-colors
                      ${
                        isSelected
                          ? "border-[#FFBF00] bg-[#FFBF00]/5"
                          : "border-[#e8e8e8] hover:border-[#d1d5db]"
                      }
                      ${!isValidated ? "opacity-50" : ""}
                    `}
                    onClick={() => isValidated && handleToggleShop(shop.id)}
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[48px] h-[48px] rounded-[8px] overflow-hidden shrink-0">
                        <img
                          src={shop.imageUrl}
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] truncate">
                          {shop.name}
                        </p>
                        <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                          {shop.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        {!isValidated && (
                          <span className="font-['Space_Grotesk'] text-[11px] text-[#ef4444] bg-[#ef4444]/10 px-[8px] py-[4px] rounded-[4px]">
                            Non validé
                          </span>
                        )}
                        <div
                          className={`
                            w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center
                            ${
                              isSelected
                                ? "border-[#FFBF00] bg-[#FFBF00]"
                                : "border-[#d1d5db]"
                            }
                          `}
                        >
                          {isSelected && (
                            <svg
                              className="w-[12px] h-[12px] text-[#1f1f1f]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-[12px] p-[24px] border-t border-[#e5e7eb]">
          <button
            onClick={onClose}
            className="flex-1 bg-[#e5e7eb] text-[#1f1f1f] px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#d1d5db] transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#1f1f1f] text-white px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors"
          >
            Enregistrer les accès
          </button>
        </div>
      </div>
    </div>
  );
}
