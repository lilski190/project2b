import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const SUPPORTED_LANGUAGES = ["de", "en"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean); // z.B. ['de', 'login']
  const langInPath = pathSegments[0];

  // ⛔️ Wenn Sprache in der URL fehlt oder ungültig → redirect mit Default (de)
  if (!SUPPORTED_LANGUAGES.includes(langInPath)) {
    const newUrl = new URL(`/de${pathname}`, req.url);
    return NextResponse.redirect(newUrl);
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const strippedPath = `/${pathSegments.slice(1).join("/")}`;

  const publicRoutes = ["/", "/about", "/impressum", "/pro", "/con", "/list"];
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/trapper",
    "/trapper/list",
  ];
  const authRoutes = ["/login", "/register"];

  if (publicRoutes.includes(strippedPath)) return res;

  if (protectedRoutes.some((route) => strippedPath.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL(`/${langInPath}/login`, req.url));
    }
    return res;
  }

  if (authRoutes.includes(strippedPath)) {
    if (user) {
      return NextResponse.redirect(
        new URL(`/${langInPath}/dashboard`, req.url)
      );
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
