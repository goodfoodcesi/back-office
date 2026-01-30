"use client";

import { Sidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AllowedUserType = "admin" | "shop";

/**
 * Type guard : vérifie si le string est un userType autorisé
 */
function isAllowedUserType(value: string): value is AllowedUserType {
  return value === "admin" || value === "shop";
}

export default function ProtectedShell({
  children,
  userType,
  userName,
}: {
  children: React.ReactNode;
  userType: string;   
  userName: string;
}) {
  const router = useRouter();


  useEffect(() => {
    if (!isAllowedUserType(userType)) {
      router.replace("/login");
    }
  }, [userType, router]);

  
  if (!isAllowedUserType(userType)) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#f6f5f8] overflow-hidden">
      <Sidebar userRole={userType} userName={userName} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}
