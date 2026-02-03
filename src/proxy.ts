import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  redirectToDefaultLocale,
  setLangCookie,
  addCspHeaders,
  checkAuthentication,
} from "./lib/middlewareFunctions";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Get locale from request url
  const locale = request.nextUrl.pathname.split("/")[1];

  // 1️⃣ Handle  if URL missing locale
  const redirect = redirectToDefaultLocale(request, routing.defaultLocale);
  if (redirect) return redirect;

  // 2️⃣ Check authentication
  const authRedirect = checkAuthentication(request);
  if (authRedirect) return authRedirect;

  // 3️⃣ Normal Next-Intl middleware
  let response = intlMiddleware(request);

  // 4️⃣ Set cookie for current locale
  response = setLangCookie(response, locale);

  // 5️⃣ Add CSP headers
  response = addCspHeaders(response);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
