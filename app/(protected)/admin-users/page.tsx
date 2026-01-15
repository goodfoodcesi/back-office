"use client"

import { AdminUsersView, UserProfile } from "@/components/AdminUsersView"
import { useState } from "react";




export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([
    {
      id: "1",
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      role: "manager",
      phone: "+33 6 12 34 56 78",
      createdAt: "2025-01-05T09:00:00Z",
      status: "pending",
      documents: [
        {
          id: "doc1",
          type: "identity",
          name: "Carte d'identité",
          uploadedAt: "2025-01-05T10:00:00Z",
          status: "validated",
          url: "https://example.com/documents/doc1.pdf",
        },
        {
          id: "doc2",
          type: "address_proof",
          name: "Justificatif de domicile",
          uploadedAt: "2025-01-05T10:15:00Z",
          status: "pending",
          url: "https://example.com/documents/doc2.pdf",
        },
        {
          id: "doc3",
          type: "bank_details",
          name: "RIB",
          uploadedAt: "2025-01-05T10:30:00Z",
          status: "pending",
          url: "https://example.com/documents/doc3.pdf",
        },
      ],
    },
    {
      id: "2",
      name: "Pierre Martin",
      email: "pierre.martin@example.com",
      role: "partner",
      phone: "+33 6 23 45 67 89",
      createdAt: "2025-01-08T11:00:00Z",
      status: "validated",
      documents: [
        {
          id: "doc4",
          type: "identity",
          name: "Passeport",
          uploadedAt: "2025-01-08T11:30:00Z",
          status: "validated",
          url: "https://example.com/documents/doc4.pdf",
        },
        {
          id: "doc5",
          type: "address_proof",
          name: "Facture électricité",
          uploadedAt: "2025-01-08T11:45:00Z",
          status: "validated",
          url: "https://example.com/documents/doc5.pdf",
        },
        {
          id: "doc6",
          type: "bank_details",
          name: "RIB",
          uploadedAt: "2025-01-08T12:00:00Z",
          status: "validated",
          url: "https://example.com/documents/doc6.pdf",
        },
      ],
    },
    {
      id: "3",
      name: "Sophie Bernard",
      email: "sophie.bernard@example.com",
      role: "manager",
      phone: "+33 6 34 56 78 90",
      createdAt: "2025-01-12T15:00:00Z",
      status: "incomplete",
      documents: [
        {
          id: "doc7",
          type: "identity",
          name: "Carte d'identité",
          uploadedAt: "2025-01-12T15:30:00Z",
          status: "refused",
          url: "https://example.com/documents/doc7.pdf",
          adminComment: "Le document est expiré. Veuillez fournir une pièce d'identité valide.",
        },
        {
          id: "doc8",
          type: "address_proof",
          name: "Quittance de loyer",
          uploadedAt: "2025-01-12T15:45:00Z",
          status: "pending",
          url: "https://example.com/documents/doc8.pdf",
        },
        {
          id: "doc9",
          type: "business_registration",
          name: "Extrait KBIS",
          uploadedAt: "2025-01-12T16:00:00Z",
          status: "pending",
          url: "https://example.com/documents/doc9.pdf",
        },
      ],
    },
  ]);


    const handleValidateUserDocument = (
    userId: string,
    documentId: string,
    comment?: string
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              documents: user.documents.map((doc) =>
                doc.id === documentId
                  ? { ...doc, status: "validated" as const, adminComment: comment }
                  : doc
              ),
            }
          : user
      )
    );
  };

  const handleRefuseUserDocument = (
    userId: string,
    documentId: string,
    comment: string
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              documents: user.documents.map((doc) =>
                doc.id === documentId
                  ? { ...doc, status: "refused" as const, adminComment: comment }
                  : doc
              ),
            }
          : user
      )
    );
  };

  const handleValidateUser = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: "validated" as const } : user
      )
    );
  };

  return (
                      <AdminUsersView
                    users={users}
                    onValidateDocument={handleValidateUserDocument}
                    onRefuseDocument={handleRefuseUserDocument}
                    onValidateUser={handleValidateUser}
                  />
  )
}