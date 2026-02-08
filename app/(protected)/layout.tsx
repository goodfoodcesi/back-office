import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import ProtectedShell from "./ProtectedShell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!["admin", "shop"].includes(user.userType)) {
    redirect("/login");
  }

  return (
    <ProtectedShell userName={user.name} userType={user.userType}>
      {children}
    </ProtectedShell>
  );
}