import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Save, Clock } from "lucide-react";
import { toast } from "sonner";

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ShopDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  siret?: string;
  legalName?: string;
  vatNumber?: string;
  openingHours?: OpeningHours[];
  imageUrl: string;
  gallery?: string[];
  menus?: any[];
  inventory?: any[];
  status: "draft" | "pending" | "validated" | "refused";
  createdAt: string;
  adminMessage?: string;
}

interface ShopGeneralInfoProps {
  shopData: ShopDetails;
  onUpdate: (data: Partial<ShopDetails>) => void;
}

const defaultOpeningHours: OpeningHours[] = [
  { day: "Lundi", open: "09:00", close: "18:00", closed: false },
  { day: "Mardi", open: "09:00", close: "18:00", closed: false },
  { day: "Mercredi", open: "09:00", close: "18:00", closed: false },
  { day: "Jeudi", open: "09:00", close: "18:00", closed: false },
  { day: "Vendredi", open: "09:00", close: "18:00", closed: false },
  { day: "Samedi", open: "10:00", close: "16:00", closed: false },
  { day: "Dimanche", open: "10:00", close: "16:00", closed: true },
];

export function ShopGeneralInfo({ shopData, onUpdate }: ShopGeneralInfoProps) {
  const [formData, setFormData] = useState({
    name: shopData.name || "",
    category: shopData.category || "",
    description: shopData.description || "",
    address: shopData.address || "",
    phone: shopData.phone || "",
    email: shopData.email || "",
    siret: shopData.siret || "",
    legalName: shopData.legalName || "",
    vatNumber: shopData.vatNumber || "",
  });

  const [openingHours, setOpeningHours] = useState<OpeningHours[]>(
    shopData.openingHours || defaultOpeningHours
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpeningHoursChange = (
    index: number,
    field: keyof OpeningHours,
    value: string | boolean
  ) => {
    const updated = [...openingHours];
    updated[index] = { ...updated[index], [field]: value };
    setOpeningHours(updated);
  };

  const handleSave = () => {
    onUpdate({
      ...formData,
      openingHours,
    });
    toast.success("Informations mises à jour avec succès");
  };

  return (
    <div className="bg-white rounded-[12px] p-[24px]">
      <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f] mb-[24px]">
        Informations générales
      </h2>

      <div className="grid grid-cols-2 gap-[24px] mb-[32px]">
        {/* Basic Information */}
        <div className="space-y-[16px]">
          <div>
            <Label htmlFor="name" className="font-['Space_Grotesk']">
              Nom du restaurant *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div>
            <Label htmlFor="category" className="font-['Space_Grotesk']">
              Catégorie *
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Ex: Restaurant, Fast Food, Pizzeria..."
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div>
            <Label htmlFor="description" className="font-['Space_Grotesk']">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div>
            <Label htmlFor="address" className="font-['Space_Grotesk']">
              Adresse complète *
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>
        </div>

        {/* Contact & Legal Information */}
        <div className="space-y-[16px]">
          <div>
            <Label htmlFor="phone" className="font-['Space_Grotesk']">
              Téléphone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Ex: +33 1 23 45 67 89"
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div>
            <Label htmlFor="email" className="font-['Space_Grotesk']">
              Email de contact
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="contact@restaurant.com"
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div className="border-t pt-[16px] mt-[16px]">
            <h3 className="font-['Space_Grotesk'] text-[16px] text-[#1f1f1f] mb-[16px]">
              Informations légales
            </h3>

            <div className="space-y-[16px]">
              <div>
                <Label htmlFor="legalName" className="font-['Space_Grotesk']">
                  Raison sociale
                </Label>
                <Input
                  id="legalName"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className="mt-[8px] font-['Space_Grotesk']"
                />
              </div>

              <div>
                <Label htmlFor="siret" className="font-['Space_Grotesk']">
                  SIRET
                </Label>
                <Input
                  id="siret"
                  name="siret"
                  value={formData.siret}
                  onChange={handleInputChange}
                  placeholder="123 456 789 00012"
                  className="mt-[8px] font-['Space_Grotesk']"
                />
              </div>

              <div>
                <Label htmlFor="vatNumber" className="font-['Space_Grotesk']">
                  Numéro de TVA
                </Label>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleInputChange}
                  placeholder="FR 12 345678901"
                  className="mt-[8px] font-['Space_Grotesk']"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="border-t pt-[24px] mb-[24px]">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <Clock className="w-[20px] h-[20px] text-[#FFBF00]" />
          <h3 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f]">
            Horaires d'ouverture
          </h3>
        </div>

        <div className="space-y-[12px]">
          {openingHours.map((hours, index) => (
            <div
              key={hours.day}
              className="flex items-center gap-[16px] bg-[#f9fafb] rounded-[8px] p-[12px]"
            >
              <div className="w-[100px]">
                <span className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                  {hours.day}
                </span>
              </div>

              <div className="flex items-center gap-[8px] flex-1">
                <Input
                  type="time"
                  value={hours.open}
                  onChange={(e) =>
                    handleOpeningHoursChange(index, "open", e.target.value)
                  }
                  disabled={hours.closed}
                  className="font-['Space_Grotesk']"
                />
                <span className="text-[#6b7280]">-</span>
                <Input
                  type="time"
                  value={hours.close}
                  onChange={(e) =>
                    handleOpeningHoursChange(index, "close", e.target.value)
                  }
                  disabled={hours.closed}
                  className="font-['Space_Grotesk']"
                />
              </div>

              <label className="flex items-center gap-[8px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hours.closed}
                  onChange={(e) =>
                    handleOpeningHoursChange(index, "closed", e.target.checked)
                  }
                  className="w-[16px] h-[16px] rounded border-[#d1d5db] text-[#FFBF00] focus:ring-[#FFBF00]"
                />
                <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                  Fermé
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk'] px-[24px]"
        >
          <Save className="w-[16px] h-[16px] mr-[8px]" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
