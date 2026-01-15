import { useState } from "react";
import { X } from "lucide-react";
import { Shop } from "./ShopCard";

interface AdminActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
  action: "validate" | "refuse" | "request-info" | null;
  onConfirm: (message?: string) => void;
}

export function AdminActionModal({
  isOpen,
  onClose,
  shop,
  action,
  onConfirm,
}: AdminActionModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen || !shop || !action) return null;

  const handleConfirm = () => {
    onConfirm(message);
    setMessage("");
    onClose();
  };

  const actionConfig = {
    validate: {
      title: "Valider le shop",
      description: "Êtes-vous sûr de vouloir valider ce shop ?",
      confirmText: "Valider",
      confirmBg: "#22c55e",
      requireMessage: false,
    },
    refuse: {
      title: "Refuser le shop",
      description: "Veuillez indiquer la raison du refus :",
      confirmText: "Refuser",
      confirmBg: "#ef4444",
      requireMessage: true,
    },
    "request-info": {
      title: "Demander plus d'informations",
      description: "Veuillez préciser les informations demandées :",
      confirmText: "Envoyer",
      confirmBg: "#FFBF00",
      requireMessage: true,
    },
  };

  const config = actionConfig[action];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[500px] w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-[#e5e7eb]">
          <h2 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f]">
            {config.title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#1f1f1f] transition-colors"
          >
            <X className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-[24px]">
          <div className="bg-[#f3f4f6] rounded-[8px] p-[16px] mb-[16px]">
            <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[4px]">
              <strong>Shop:</strong> {shop.name}
            </p>
            <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
              {shop.address}
            </p>
          </div>

          <p className="font-['Space_Grotesk'] text-[14px] text-[#4b5563] mb-[16px]">
            {config.description}
          </p>

          {config.requireMessage && (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Saisissez votre message..."
              className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors resize-none mb-[16px]"
            />
          )}

          {/* Actions */}
          <div className="flex gap-[12px]">
            <button
              onClick={onClose}
              className="flex-1 bg-[#e5e7eb] text-[#1f1f1f] px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#d1d5db] transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={config.requireMessage && !message.trim()}
              style={{ backgroundColor: config.confirmBg }}
              className="flex-1 text-white px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {config.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
