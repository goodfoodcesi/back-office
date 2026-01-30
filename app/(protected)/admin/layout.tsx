import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = (await cookies()).toString();
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: cookieHeader,
      },
    },
  });
  if (error || !data) {
    redirect("/login");
  }

  if (data.user.userType !== "admin") {
    redirect("/shop/dashboard");
  }

  return children;
}
