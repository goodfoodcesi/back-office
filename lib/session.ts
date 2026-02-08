import { cookies } from "next/headers";
import { decodeJwt } from "jose";

type User = {
  id: string;
  name: string;
  email: string;
  userType: "admin" | "shop";
  emailVerified: boolean;
  image: string | null;
};

type SessionData = {
  session: {
    user: User;
    session: {
      token: string;
      expiresAt: string;
      userId: string;
    };
  };
};

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get("better-auth.session_data");

  if (!sessionData?.value) {
    return null;
  }

  try {
    const decoded = decodeJwt(sessionData.value) as SessionData;
    return decoded.session?.user || null;
  } catch (error) {
    console.error("Failed to decode session:", error);
    return null;
  }
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.userType !== "admin") {
    throw new Error("Forbidden: Admin only");
  }
  return user;
}

export async function requireShop(): Promise<User> {
  const user = await requireUser();
  if (user.userType !== "shop") {
    throw new Error("Forbidden: Shop only");
  }
  return user;
}