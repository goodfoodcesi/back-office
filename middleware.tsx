import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("better-auth.session_token");
  const { pathname } = request.nextUrl;

  // pages publiques
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  if (!token && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/redirect";
    return NextResponse.redirect(url);
  }

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
