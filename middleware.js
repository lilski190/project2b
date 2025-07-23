import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const SUPPORTED_LANGUAGES = ["de", "en", "deLS"];

/**
 * Middleware zur Sprachvalidierung und Authentifizierung in der Next.js-Anwendung.
 *
 * Diese Middleware überprüft die Sprache im URL-Pfad und sorgt dafür,
 * dass alle URLs mit einer unterstützten Sprache beginnen (Standard: `de`).
 * Sie implementiert außerdem eine Zugriffssteuerung:
 * - Öffentliche Routen sind für alle zugänglich.
 * - Geschützte Routen erfordern eine gültige Benutzersitzung (Anmeldung).
 * - Auth-Routen sind nur für nicht angemeldete Benutzer zugänglich (z. B. Login).
 *
 * Die Authentifizierung wird über Supabase geprüft.
 * Bei fehlender Anmeldung erfolgt eine Weiterleitung auf die Login-Seite.
 * Angemeldete Benutzer werden von der Login-Seite zum Dashboard weitergeleitet.
 *
 * @param {Request} req - Der eingehende HTTP-Request, inklusive URL und Headern.
 * @returns {NextResponse} Antwort der Middleware mit Weiterleitung oder Freigabe.
 */
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean);
  const langInPath = pathSegments[0];

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
