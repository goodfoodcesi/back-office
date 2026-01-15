import { useState } from "react";
import { Plus, Users, Mail, Building2, Edit, Trash2 } from "lucide-react";
import { CreatePartnerModal } from "./CreatePartnerModal";
import { ManagePartnerAccessModal } from "./ManagePartnerAccessModal";
import { Organization } from "./OrganizationsView";
import { Shop } from "./ShopCard";

export interface Partner {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  createdAt: string;
  accessibleShops: string[]; // Array of shop IDs
}

interface PartnersViewProps {
  partners: Partner[];
  organizations: Organization[];
  shops: Shop[];
  onCreatePartner: (partner: Omit<Partner, "id" | "createdAt" | "accessibleShops">) => void;
  onDeletePartner: (partnerId: string) => void;
  onUpdatePartnerAccess: (partnerId: string, shopIds: string[]) => void;
}

export function PartnersView({
  partners,
  organizations,
  shops,
  onCreatePartner,
  onDeletePartner,
  onUpdatePartnerAccess,
}: PartnersViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const getOrganizationName = (orgId: string) => {
    return organizations.find((o) => o.id === orgId)?.name || "N/A";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-[32px]">
        <div className="flex items-center justify-between mb-[16px]">
          <div>
            <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
              Mes Partenaires
            </h1>
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              Gérez vos partenaires et leurs accès aux shops
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#1f1f1f] text-white px-[20px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors flex items-center gap-[8px]"
            disabled={organizations.length === 0}
          >
            <Plus className="w-[20px] h-[20px]" />
            Ajouter un partenaire
          </button>
        </div>
        {organizations.length === 0 && (
          <div className="bg-[#fef3c7] border border-[#fbbf24] rounded-[8px] p-[12px]">
            <p className="font-['Space_Grotesk'] text-[13px] text-[#92400e]">
              Créez d'abord une organisation avant d'ajouter des partenaires.
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[32px]">
        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#1f1f1f]/10 flex items-center justify-center">
              <Users className="w-[24px] h-[24px] text-[#1f1f1f]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {partners.length}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Total partenaires
          </p>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FFBF00]/10 flex items-center justify-center">
              <Building2 className="w-[24px] h-[24px] text-[#FFBF00]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {new Set(partners.map((p) => p.organizationId)).size}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Organisations actives
          </p>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#22c55e]/10 flex items-center justify-center">
              <Users className="w-[24px] h-[24px] text-[#22c55e]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {partners.reduce((acc, p) => acc + p.accessibleShops.length, 0)}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Accès totaux
          </p>
        </div>
      </div>

      {/* Partners List */}
      {partners.length === 0 ? (
        <div className="bg-white rounded-[12px] p-[48px] text-center">
          <div className="max-w-[400px] mx-auto">
            <div className="bg-[#f3f4f6] w-[80px] h-[80px] rounded-[16px] flex items-center justify-center mx-auto mb-[16px]">
              <Users className="w-[40px] h-[40px] text-[#6b7280]" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f] mb-[8px]">
              Aucun partenaire
            </h3>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[24px]">
              Ajoutez des partenaires pour gérer les accès à vos shops
            </p>
            {organizations.length > 0 && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#1f1f1f] text-white px-[24px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors"
              >
                Ajouter un partenaire
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              <tr>
                <th className="text-left px-[20px] py-[12px] font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                  Partenaire
                </th>
                <th className="text-left px-[20px] py-[12px] font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                  Organisation
                </th>
                <th className="text-left px-[20px] py-[12px] font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                  Accès shops
                </th>
                <th className="text-left px-[20px] py-[12px] font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                  Date création
                </th>
                <th className="text-right px-[20px] py-[12px] font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                  <td className="px-[20px] py-[16px]">
                    <div>
                      <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                        {partner.name}
                      </p>
                      <div className="flex items-center gap-[6px] mt-[4px]">
                        <Mail className="w-[12px] h-[12px] text-[#6b7280]" />
                        <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                          {partner.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-[20px] py-[16px]">
                    <div className="flex items-center gap-[8px]">
                      <Building2 className="w-[16px] h-[16px] text-[#6b7280]" />
                      <span className="font-['Space_Grotesk'] text-[13px] text-[#1f1f1f]">
                        {getOrganizationName(partner.organizationId)}
                      </span>
                    </div>
                  </td>
                  <td className="px-[20px] py-[16px]">
                    <span className="font-['Space_Grotesk'] text-[13px] text-[#1f1f1f]">
                      {partner.accessibleShops.length} shops
                    </span>
                  </td>
                  <td className="px-[20px] py-[16px]">
                    <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                      {new Date(partner.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </td>
                  <td className="px-[20px] py-[16px]">
                    <div className="flex items-center justify-end gap-[8px]">
                      <button
                        onClick={() => setSelectedPartner(partner)}
                        className="text-[#6b7280] hover:text-[#1f1f1f] transition-colors"
                        title="Gérer les accès"
                      >
                        <Edit className="w-[18px] h-[18px]" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Êtes-vous sûr de vouloir supprimer le partenaire "${partner.name}" ?`)) {
                            onDeletePartner(partner.id);
                          }
                        }}
                        className="text-[#6b7280] hover:text-[#ef4444] transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <CreatePartnerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        organizations={organizations}
        onSubmit={(partnerData) => {
          onCreatePartner(partnerData);
        }}
      />

      {selectedPartner && (
        <ManagePartnerAccessModal
          isOpen={!!selectedPartner}
          onClose={() => setSelectedPartner(null)}
          partner={selectedPartner}
          shops={shops}
          onUpdateAccess={(shopIds) => {
            onUpdatePartnerAccess(selectedPartner.id, shopIds);
            setSelectedPartner(null);
          }}
        />
      )}
    </div>
  );
}
