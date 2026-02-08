import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function RedirectPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  switch (user.userType) {
    case "admin":
      redirect("/admin/");
    case "shop":
      redirect("/shop/");
    default:
      redirect("/login");
  }
}