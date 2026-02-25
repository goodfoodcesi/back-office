"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { shopApiClientFetch } from "@/lib/shop-api-client";
import { useRouter } from "next/navigation";

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateShopModal({ isOpen, onClose }: CreateShopModalProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const coverImageValue = String(formData.get("coverImage") ?? "");
      const payload = {
        name: String(formData.get("name") ?? ""),
        description: String(formData.get("description") ?? ""),
        category: String(formData.get("category") ?? ""),
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
        zipCode: String(formData.get("zipCode") ?? ""),
        country: String(formData.get("country") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        siret: String(formData.get("siret") ?? ""),
        ...(coverImageValue ? { coverImage: coverImageValue } : {}),
      };

      const requiredFields = [payload.name, payload.description, payload.category, payload.address, payload.city, payload.zipCode, payload.country, payload.phone, payload.siret];
      if (requiredFields.some((v) => !v)) {
        setError("Tous les champs sont obligatoires.");
        setLoading(false);
        return;
      }

      await shopApiClientFetch("/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="p-[24px]">
          <div className="flex flex-col gap-[16px]">
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Nom du shop *
              </label>
              <input
                name="name"
                required
                placeholder="Ex: Burger King"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Catégorie *
              </label>
              <select
                name="category"
                required
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
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

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Décrivez votre établissement..."
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] resize-none"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Adresse *
              </label>
              <input
                name="address"
                required
                placeholder="Ex: 123 Rue de la République"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Ville *
              </label>
              <input
                name="city"
                required
                placeholder="Ex: Paris"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Code postal *
              </label>
              <input
                name="zipCode"
                required
                placeholder="Ex: 75001"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Pays *
              </label>
              <input
                name="country"
                required
                placeholder="Ex: France"
                defaultValue="France"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Téléphone *
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="Ex: 01 23 45 67 89"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                SIRET *
              </label>
              <input
                name="siret"
                required
                placeholder="Ex: 12345678901234"
                minLength={14}
                maxLength={14}
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                Image de couverture (URL)
              </label>
              <input
                name="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 mt-[16px]">{error}</p>
          )}

          <div className="flex gap-[12px] mt-[24px]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-[#e5e7eb] text-[#1f1f1f] px-[16px] py-[12px] rounded-[12px] disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1f1f1f] text-white px-[16px] py-[12px] rounded-[12px] disabled:opacity-50"
            >
              {loading ? "Création..." : "Créer le shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
