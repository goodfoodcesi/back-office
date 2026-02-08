import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function RedirectPage() {
  console.log("🔍 Page redirect - Checking user...");

  const user = await getCurrentUser();

  console.log("👤 User trouvé:", user);

  if (!user) {
    console.log("❌ Pas d'user, redirect vers login");
    redirect("/login");
  }

  console.log("✅ User type:", user.userType);

  switch (user.userType) {
    case "admin":
      console.log("➡️ Redirect vers /admin/");
      redirect("/admin/");
    case "shop":
      console.log("➡️ Redirect vers /shop/");
      redirect("/shop/");
    default:
      console.log("❌ Type inconnu, redirect vers login");
      redirect("/login");
  }
}