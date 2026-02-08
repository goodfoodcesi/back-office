import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("better-auth.session_data");
  const { pathname } = request.nextUrl;

  console.log("🔍 Middleware - Path:", pathname, "| Cookie:", token ? "✅ EXISTS" : "❌ MISSING");

  // pages publiques
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  // Si pas de token et page protégée → login
  if (!token && !isPublicPath && !pathname.startsWith("/redirect")) {
    console.log("❌ No token, redirecting to /login");
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si token existe et sur page de login/signup → redirect
  if (token && isPublicPath) {
    console.log("✅ Token exists on public path, redirecting to /redirect");
    const url = request.nextUrl.clone();
    url.pathname = "/redirect";
    return NextResponse.redirect(url);
  }

  console.log("✅ Middleware passed");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     IMPORTANT :
     - on exclut TOUT ce qui est assets
     - sinon HTML renvoyé à la place du JS
    */
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:css|js|json|png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
