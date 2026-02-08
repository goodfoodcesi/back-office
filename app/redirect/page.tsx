"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  userType: "admin" | "shop" | string;
};

export default function RedirectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      console.log("🔍 /redirect - Vérification de la session...");
      console.log("🍪 Cookies disponibles:", document.cookie);
      
      const result = await authClient.getSession();
      
      console.log("📊 Résultat getSession:", result);

      if (result.error || !result.data?.user) {
        console.error("❌ Pas de session valide, redirection vers /login");
        router.replace("/login");
        return;
      }

      const user = result.data.user as User;
      console.log("✅ Session valide, user:", user);

      switch (user.userType) {
        case "admin":
          console.log("🔄 Redirection vers /admin");
          router.replace("/admin");
          break;
        case "shop":
          console.log("🔄 Redirection vers /shop");
          router.replace("/shop");
          break;
        default:
          console.log("❌ Type d'utilisateur invalide:", user.userType);
          router.replace("/login");
      }
    };

    checkSession().finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p>Redirection...</p>;
  }

  return null;
}
