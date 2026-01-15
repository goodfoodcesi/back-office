import { useState } from "react";
import { X } from "lucide-react";

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shop: {
    name: string;
    description: string;
    address: string;
    category: string;
    imageUrl: string;
  }) => void;
}

export function CreateShopModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateShopModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    category: "Restaurant",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      address: "",
      category: "Restaurant",
      imageUrl: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-[#e5e7eb]">
          <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
            Créer un nouveau shop
          </h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#1f1f1f] transition-colors"
          >
            <X className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="flex flex-col gap-[16px]">
            {/* Name */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Nom du shop *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
                placeholder="Ex: Burger King"
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Catégorie *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Café">Café</option>
                <option value="Pizzeria">Pizzeria</option>
                <option value="Sushi">Sushi</option>
                <option value="Desserts">Desserts</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors resize-none"
                placeholder="Décrivez votre établissement..."
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Adresse *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
                placeholder="Ex: 123 Rue de la République, Paris"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                URL de l'image *
              </label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-[12px] mt-[24px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#e5e7eb] text-[#1f1f1f] px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#d1d5db] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#1f1f1f] text-white px-[16px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors"
            >
              Créer le shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
