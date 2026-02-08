import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔍 Middleware - Path:", pathname);

  // En production cross-domain, les cookies ne sont pas accessibles au middleware
  // L'authentification est gérée par ProtectedShell côté client
  
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
