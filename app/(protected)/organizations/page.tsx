"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopsView } from "@/components/ShopsView";
import { Shop } from "@/components/ShopCard";
import { OrganizationsView, Organization } from "@/components/OrganizationsView";
import { PartnersView, Partner } from "@/components/PartnersView";

export default function OrganizationPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "Groupe Restaurants Paris",
      description: "Réseau de restaurants gastronomiques à Paris",
      createdAt: "2025-01-01T10:00:00Z",
      partnersCount: 2,
      shopsCount: 3,
    },
    {
      id: "2",
      name: "Fast Food Network",
      description: "Chaîne de restaurants fast-food",
      createdAt: "2025-01-10T14:00:00Z",
      partnersCount: 1,
      shopsCount: 2,
    },
  ]);

    const [partners, setPartners] = useState<Partner[]>([
      {
        id: "1",
        name: "Marie Dupont",
        email: "marie.dupont@example.com",
        organizationId: "1",
        createdAt: "2025-01-05T09:00:00Z",
        accessibleShops: ["1", "2"],
      },
      {
        id: "2",
        name: "Pierre Martin",
        email: "pierre.martin@example.com",
        organizationId: "1",
        createdAt: "2025-01-08T11:00:00Z",
        accessibleShops: ["3"],
      },
      {
        id: "3",
        name: "Sophie Bernard",
        email: "sophie.bernard@example.com",
        organizationId: "2",
        createdAt: "2025-01-12T15:00:00Z",
        accessibleShops: ["1", "5"],
      },
    ]);

      const handleCreatePartner = (
        partnerData: Omit<Partner, "id" | "createdAt" | "accessibleShops">
      ) => {
        const newPartner: Partner = {
          ...partnerData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          accessibleShops: [],
        };
        setPartners([newPartner, ...partners]);
        
        // Update organization partners count
        setOrganizations(
          organizations.map((org) =>
            org.id === partnerData.organizationId
              ? { ...org, partnersCount: org.partnersCount + 1 }
              : org
          )
        );
      };

  const handleCreateOrganization = (
    orgData: Omit<Organization, "id" | "createdAt" | "partnersCount" | "shopsCount">
  ) => {
    const newOrg: Organization = {
      ...orgData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      partnersCount: 0,
      shopsCount: 0,
    };
    setOrganizations([newOrg, ...organizations]);
  };

    const handleDeleteOrganization = (orgId: string) => {
    setOrganizations(organizations.filter((org) => org.id !== orgId));
    // Also remove partners from this organization
    setPartners(partners.filter((p) => p.organizationId !== orgId));
  };

  

  return (
<>
             <OrganizationsView
               organizations={organizations}
               onCreateOrganization={handleCreateOrganization}
               onDeleteOrganization={handleDeleteOrganization}
             />
</>
  );
}
