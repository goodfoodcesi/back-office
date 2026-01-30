import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";
import ProtectedShell from "./ProtectedShell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = (await cookies()).toString();

  const { data, error } = await authClient.getSession({
    fetchOptions: { headers: { cookie: cookieHeader } },
  });

  if (error || !data) redirect("/login");

  if (!["admin", "shop"].includes(data.user.userType)) redirect("/login");

  return (
    <ProtectedShell userName={data.user.name} userType={data.user.userType}>
      {children}
    </ProtectedShell>
  );
}
