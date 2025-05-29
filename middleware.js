import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const SUPPORTED_LANGUAGES = ["de", "en"];

/**
 * Middleware für die Anwendung
 * Diese Middleware überprüft die Sprache in der URL und leitet den Benutzer entsprechend weiter.
 * Sie schützt auch private Routen und leitet den Benutzer zu den Anmeldeseiten weiter, wenn er nicht angemeldet ist.
 * Supabase wird verwendet, um den Authentifizierungsstatus des Benutzers zu überprüfen.
 * Es gibt drei Arten von Routen:
 * - Public Routes: Diese Routen sind für alle Benutzer sichtbar und erfordern keine Anmeldung.
 * - Protected Routes: Diese Routen sind nur für angemeldete Benutzer sichtbar.
 *  - Auth Routes: Diese Routen sind für nicht angemeldete Benutzer sichtbar und leiten sie zur Anmeldung weiter.
 * @param {Request} req - Der eingehende Request
 */
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean); // z.B. ['de', 'login']
  const langInPath = pathSegments[0];

  // Wenn Sprache in der URL fehlt oder ungültig → redirect mit Default (de)
  if (!SUPPORTED_LANGUAGES.includes(langInPath)) {
    const newUrl = new URL(`/de${pathname}`, req.url);
    newUrl.search = req.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const strippedPath = `/${pathSegments.slice(1).join("/")}`;

  const publicRoutes = [
    "/",
    "/about",
    "/examples",
    "/tutorial",
    "/join",
    "/impressum",
    "/collection",
  ];
  const protectedRoutes = [
    "/dashboard",
    "/styleguide",
    "/templates",
    "/content",
    "/create",
    "/management",
  ];
  const authRoutes = ["/login"];

  if (publicRoutes.includes(strippedPath)) return res;

  if (protectedRoutes.some((route) => strippedPath.startsWith(route))) {
    if (!user) {
      const newUrl = new URL(`/${langInPath}/login`, req.url);
      newUrl.search = req.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }
    return res;
  }

  if (authRoutes.includes(strippedPath)) {
    if (user) {
      const newUrl = new URL(`/${langInPath}/dashboard`, req.url);
      newUrl.search = req.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
