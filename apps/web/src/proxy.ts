import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware = createMiddleware(routing);
const defaultLocale = routing.defaultLocale;

const PUBLIC_ROUTES = ["/auth", "/login", "/403"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathWithoutLocale = pathname.replace(/^\/(en|ru|uz)/, "");

  if (PUBLIC_ROUTES.some((route) => pathWithoutLocale.startsWith(route))) {
    return NextResponse.next();
  }

//   const token = request.cookies.get("refreshToken");
//   const schema = request.cookies.get("universitySchema");

//   if (!token || !token.value || !schema || !schema.value) {
//     return NextResponse.redirect(
//       new URL(`/${defaultLocale}/auth`, request.url),
//     );
//   }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/home`, request.url),
    );
  }

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
