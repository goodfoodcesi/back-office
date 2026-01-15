import { useState } from "react";
import { Plus, Building2, Users, Edit, Trash2 } from "lucide-react";
import { CreateOrganizationModal } from "./CreateOrganizationModal";

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  partnersCount: number;
  shopsCount: number;
}

interface OrganizationsViewProps {
  organizations: Organization[];
  onCreateOrganization: (org: Omit<Organization, "id" | "createdAt" | "partnersCount" | "shopsCount">) => void;
  onDeleteOrganization: (orgId: string) => void;
}

export function OrganizationsView({
  organizations,
  onCreateOrganization,
  onDeleteOrganization,
}: OrganizationsViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-[32px]">
        <div className="flex items-center justify-between mb-[16px]">
          <div>
            <h1 className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[8px]">
              Mes Organisations
            </h1>
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              Gérez vos organisations et leur accès aux shops
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#1f1f1f] text-white px-[20px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors flex items-center gap-[8px]"
          >
            <Plus className="w-[20px] h-[20px]" />
            Créer une organisation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[32px]">
        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#1f1f1f]/10 flex items-center justify-center">
              <Building2 className="w-[24px] h-[24px] text-[#1f1f1f]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {organizations.length}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Total organisations
          </p>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FFBF00]/10 flex items-center justify-center">
              <Users className="w-[24px] h-[24px] text-[#FFBF00]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {organizations.reduce((acc, org) => acc + org.partnersCount, 0)}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Total partenaires
          </p>
        </div>

        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex items-center gap-[12px] mb-[12px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[#22c55e]/10 flex items-center justify-center">
              <Building2 className="w-[24px] h-[24px] text-[#22c55e]" />
            </div>
          </div>
          <p className="font-['Space_Grotesk'] text-[32px] text-[#1f1f1f] mb-[4px]">
            {organizations.reduce((acc, org) => acc + org.shopsCount, 0)}
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
            Shops partagés
          </p>
        </div>
      </div>

      {/* Organizations List */}
      {organizations.length === 0 ? (
        <div className="bg-white rounded-[12px] p-[48px] text-center">
          <div className="max-w-[400px] mx-auto">
            <div className="bg-[#f3f4f6] w-[80px] h-[80px] rounded-[16px] flex items-center justify-center mx-auto mb-[16px]">
              <Building2 className="w-[40px] h-[40px] text-[#6b7280]" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-[20px] text-[#1f1f1f] mb-[8px]">
              Aucune organisation
            </h3>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[24px]">
              Créez votre première organisation pour gérer les accès à vos shops
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#1f1f1f] text-white px-[24px] py-[12px] rounded-[12px] font-['Space_Grotesk'] hover:bg-[#2a2a2a] transition-colors"
            >
              Créer une organisation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-[12px] p-[20px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-[16px]">
                <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FFBF00] flex items-center justify-center shrink-0">
                  <Building2 className="w-[24px] h-[24px] text-[#1f1f1f]" />
                </div>
                <div className="flex gap-[8px]">
                  <button className="text-[#6b7280] hover:text-[#1f1f1f] transition-colors">
                    <Edit className="w-[18px] h-[18px]" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Êtes-vous sûr de vouloir supprimer l'organisation "${org.name}" ?`)) {
                        onDeleteOrganization(org.id);
                      }
                    }}
                    className="text-[#6b7280] hover:text-[#ef4444] transition-colors"
                  >
                    <Trash2 className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>

              <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[8px]">
                {org.name}
              </h3>
              <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mb-[16px] line-clamp-2">
                {org.description}
              </p>

              <div className="flex items-center gap-[16px] pt-[16px] border-t border-[#e5e7eb]">
                <div className="flex items-center gap-[8px]">
                  <Users className="w-[16px] h-[16px] text-[#6b7280]" />
                  <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                    {org.partnersCount} partenaires
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <Building2 className="w-[16px] h-[16px] text-[#6b7280]" />
                  <span className="font-['Space_Grotesk'] text-[13px] text-[#6b7280]">
                    {org.shopsCount} shops
                  </span>
                </div>
              </div>

              <p className="font-['Space_Grotesk'] text-[11px] text-[#9ca3af] mt-[12px]">
                Créé le {new Date(org.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(orgData) => {
          onCreateOrganization(orgData);
        }}
      />
    </div>
  );
}
