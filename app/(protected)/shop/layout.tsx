import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.userType !== "shop") {
    redirect("/login");
  }

  return children;
}
