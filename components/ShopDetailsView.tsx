import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShopGeneralInfo, ShopDetails } from "./ShopGeneralInfo";
import { ShopGallery } from "./ShopGallery";
import { ShopMenus, MenuItem } from "./ShopMenus";
import { ShopInventory, InventoryItem } from "./ShopInventory";

interface ShopDetailsViewProps {
  shopId: string;
  shopData: ShopDetails;
  onBack: () => void;
  onUpdateShop: (shopId: string, updatedData: Partial<ShopDetails>) => void;
}

export function ShopDetailsView({
  shopId,
  shopData,
  onBack,
  onUpdateShop,
}: ShopDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("general");

  const handleUpdateGeneral = (data: Partial<ShopDetails>) => {
    onUpdateShop(shopId, data);
  };

  const handleUpdateGallery = (images: string[]) => {
    onUpdateShop(shopId, { gallery: images });
  };

  const handleUpdateMenus = (menus: MenuItem[]) => {
    onUpdateShop(shopId, { menus });
  };

  const handleUpdateInventory = (inventory: InventoryItem[]) => {
    onUpdateShop(shopId, { inventory });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-[24px] flex items-center gap-[16px]">
        <button
          onClick={onBack}
          className="flex items-center gap-[8px] px-[16px] py-[8px] bg-white rounded-[8px] font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] hover:bg-[#f3f4f6] transition-colors"
        >
          <ArrowLeft className="w-[16px] h-[16px]" />
          Retour
        </button>
        <div>
          <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f]">
            {shopData.name}
          </h1>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            {shopData.category}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white rounded-[12px] p-[4px] mb-[24px] font-['Space_Grotesk']">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#FFBF00] rounded-[8px] px-[20px] py-[8px]"
          >
            Informations générales
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-[#FFBF00] rounded-[8px] px-[20px] py-[8px]"
          >
            Galerie
          </TabsTrigger>
          <TabsTrigger
            value="menus"
            className="data-[state=active]:bg-[#FFBF00] rounded-[8px] px-[20px] py-[8px]"
          >
            Menus & Plats
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-[#FFBF00] rounded-[8px] px-[20px] py-[8px]"
          >
            Stock & Matières premières
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ShopGeneralInfo
            shopData={shopData}
            onUpdate={handleUpdateGeneral}
          />
        </TabsContent>

        <TabsContent value="gallery">
          <ShopGallery
            images={shopData.gallery || []}
            onUpdate={handleUpdateGallery}
          />
        </TabsContent>

        <TabsContent value="menus">
          <ShopMenus
            menus={shopData.menus || []}
            onUpdate={handleUpdateMenus}
          />
        </TabsContent>

        <TabsContent value="inventory">
          <ShopInventory
            inventory={shopData.inventory || []}
            onUpdate={handleUpdateInventory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
