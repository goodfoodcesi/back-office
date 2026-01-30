
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";


export default async function ShopLayout({
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

  if (data.user.userType !== "shop") {
    redirect("/login");
  }

  return children;
}
