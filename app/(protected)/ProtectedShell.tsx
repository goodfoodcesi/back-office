"use client";

import { authClient } from "@/lib/auth-client";
import { Sidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AllowedUserType = "admin" | "shop";

function isAllowedUserType(value: string): value is AllowedUserType {
  return value === "admin" || value === "shop";
}

export default function ProtectedShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    userType: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const check = async () => {
      const result = await authClient.getSession();

      if (result.error || !result.data?.user) {
        router.replace("/login");
        return;
      }

      if (!isAllowedUserType(result.data.user.userType)) {
        router.replace("/login");
        return;
      }

      setUser({
        userType: result.data.user.userType,
        name: result.data.user.name,
      });
      setLoading(false);
    };

    check();
  }, [router]);

  if (loading || !user) {
    return <p>Chargement…</p>;
  }

  return (
    <div className="flex h-screen bg-[#f6f5f8] overflow-hidden">
      <Sidebar userRole={user.userType} userName={user.name} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}
