import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";


export default async function RedirectPage() {
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

  switch (data.user.userType) {
    case "admin":
      redirect("/admin/");
    case "shop":
      redirect("/shop/");
    default:
      redirect("/login");
  }
}