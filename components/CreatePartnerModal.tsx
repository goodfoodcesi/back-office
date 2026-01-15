import { useState } from "react";
import { X } from "lucide-react";
import { Organization } from "./OrganizationsView";

interface CreatePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizations: Organization[];
  onSubmit: (partner: { name: string; email: string; organizationId: string }) => void;
}

export function CreatePartnerModal({
  isOpen,
  onClose,
  organizations,
  onSubmit,
}: CreatePartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organizationId: organizations[0]?.id || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      organizationId: organizations[0]?.id || "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[500px] w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-[#e5e7eb]">
          <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
            Ajouter un partenaire
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
                Nom du partenaire *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
                placeholder="Ex: Marie Dupont"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
                placeholder="marie.dupont@example.com"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
                Organisation *
              </label>
              <select
                required
                value={formData.organizationId}
                onChange={(e) =>
                  setFormData({ ...formData, organizationId: e.target.value })
                }
                className="w-full bg-white border-2 border-[#e8e8e8] rounded-[8px] px-[12px] py-[10px] font-['Space_Grotesk'] text-[14px] focus:border-[#FFBF00] outline-none transition-colors"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
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
              Ajouter le partenaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
