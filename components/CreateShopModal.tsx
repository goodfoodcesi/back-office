"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { createShopAction } from "@/app/actions/shop/action";

type State = { ok: boolean; error: string };
const initialState: State = { ok: false, error: "" };

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateShopModal({ isOpen, onClose }: CreateShopModalProps) {
  const [state, formAction] = React.useActionState(
    createShopAction,
    initialState,
  );

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

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

        <form action={formAction} className="p-[24px]">
          {/* Hidden field to pass cookies to Server Action */}
          <input type="hidden" name="__cookies" value={typeof document !== 'undefined' ? document.cookie : ''} />
          
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
                placeholder="Ex: 123 Rue de la République, Paris"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>

            <div>
              <label className="font-['Space_Grotesk'] text-[14px] mb-[8px] block">
                URL de l'image *
              </label>
              <input
                name="imageUrl"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px]"
              />
            </div>
          </div>

          {state.error && (
            <p className="text-red-600 mt-[16px]">{state.error}</p>
          )}

          <div className="flex gap-[12px] mt-[24px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#e5e7eb] text-[#1f1f1f] px-[16px] py-[12px] rounded-[12px]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#1f1f1f] text-white px-[16px] py-[12px] rounded-[12px]"
            >
              Créer le shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
