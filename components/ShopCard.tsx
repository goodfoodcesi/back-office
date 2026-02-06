// ShopCard.tsx (mêmes styles, juste data + fallback)
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Clock, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Shop {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;

  status:
  | "draft"
  | "pending_validation"
  | "validated"
  | "rejected"
  | "action_required"
  | "visible"
  | "hidden";

  // backend: logo / coverImage (ou rien)
  logo?: string | null;
  coverImage?: string | null;

  createdAt: string;
  adminMessage?: string;
  category?: string | null;
}

interface ShopCardProps {
  shop: Shop;
  onClick?: (id: string) => void;
  showAdminActions?: boolean;
  onValidate?: () => void;
  onRefuse?: () => void;
  onRequestInfo?: () => void;
}

function buildAddress(shop: Shop) {
  const parts = [
    shop.address,
    shop.addressLine2,
    [shop.zipCode, shop.city].filter(Boolean).join(" "),
    shop.country,
  ]
    .map((v) => (v ?? "").trim())
    .filter(Boolean);

  return parts.join(", ");
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
  <rect width="100%" height="100%" fill="#e5e7eb"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    fill="#9ca3af" font-family="Arial, sans-serif" font-size="36">
    No image
  </text>
</svg>
`);

export function ShopCard({
  shop,
  onClick,
  showAdminActions = false,
  onValidate,
  onRefuse,
  onRequestInfo,
}: ShopCardProps) {
  const router = useRouter();
  const addressText = buildAddress(shop) || "Adresse non renseignée";
  const imageUrl = shop.coverImage || shop.logo || FALLBACK_IMAGE;

  const handleViewOrders = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/shop/shops/${shop.id}/orders`);
  };

  console.log("les info dans shop card oooooo: ", shop);

  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(shop.id)}
    >
      {/* Image */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[12px] right-[12px]">
          <StatusBadge status={shop.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px]">
        <div className="flex items-start justify-between mb-[8px]">
          <div className="flex-1">
            <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[4px]">
              {shop.name}
            </h3>
            <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280] mb-[8px]">
              {(shop.category ?? "").trim() || "Restaurant"}
            </p>
          </div>
        </div>

        <p className="font-['Space_Grotesk'] text-[14px] text-[#4b5563] mb-[12px] line-clamp-2">
          {(shop.description ?? "").trim() || "Aucune description fournie"}
        </p>

        <div className="flex items-center gap-[8px] mb-[12px]">
          <MapPin className="w-[14px] h-[14px] text-[#6b7280]" />
          <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
            {addressText}
          </p>
        </div>

        <div className="flex items-center gap-[8px] mb-[12px]">
          <Clock className="w-[14px] h-[14px] text-[#6b7280]" />
          <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
            Créé le {new Date(shop.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {shop.adminMessage && (
          <div className="bg-[#fef3c7] border border-[#fbbf24] rounded-[8px] p-[12px] mb-[12px]">
            <p className="font-['Space_Grotesk'] text-[12px] text-[#92400e]">
              <strong>Message admin:</strong> {shop.adminMessage}
            </p>
          </div>
        )}

        {/* View Orders Button for validated shops */}
        {["validated", "visible"].includes(shop.status) && !showAdminActions && (
          <button
            onClick={handleViewOrders}
            className="w-full bg-[#FFBF00] text-[#1f1f1f] px-[12px] py-[8px] rounded-[8px] font-['Space_Grotesk'] text-[14px] hover:bg-[#e6ac00] transition-colors flex items-center justify-center gap-[8px] mb-[12px]"
          >
            <ShoppingBag className="w-[16px] h-[16px]" />
            Voir les commandes
          </button>
        )}

        {/* Admin Actions */}
        {showAdminActions && shop.status === "pending_validation" && (
          <div className="flex gap-[8px] mt-[12px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onValidate?.();
              }}
              className="flex-1 bg-[#22c55e] text-white px-[12px] py-[8px] rounded-[8px] font-['Space_Grotesk'] text-[12px] hover:bg-[#16a34a] transition-colors"
            >
              Valider
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRequestInfo?.();
              }}
              className="flex-1 bg-[#FFBF00] text-[#1f1f1f] px-[12px] py-[8px] rounded-[8px] font-['Space_Grotesk'] text-[12px] hover:bg-[#e6ac00] transition-colors"
            >
              Demander info
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRefuse?.();
              }}
              className="flex-1 bg-[#ef4444] text-white px-[12px] py-[8px] rounded-[8px] font-['Space_Grotesk'] text-[12px] hover:bg-[#dc2626] transition-colors"
            >
              Refuser
            </button>
          </div>
        )}
      </div>
    </div >
  );
}
