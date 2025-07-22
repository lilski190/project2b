"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { pathnames } from "@/lib/globals";

import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { logoutAction } from "@/app/actions/authAction";
import { ICONS } from "@/lib/globals";

/**
 * HeaderWithSidebar Komponent
 * Dieser Komponent ist ein Header mit einer Sidebar, die Links zu verschiedenen Seiten enthält.
 * Die Sidebar ist standardmäßig ausgeblendet und kann durch Klicken auf das Hamburger-Menü-Symbol geöffnet werden.
 * Das Styling erfolgt über Tailwind CSS-Klassen und DaisyUI-Klassen.
 * @param {String} lang - Die aktuelle Sprache der Anwendung, die in der URL verwendet wird.
 */
export default function HeaderWithSidebar({ lang, dict, user }) {
  const pathname = usePathname();

  // Zerlegt den Pfad in Teile: ["", "de", "style"]
  const segments = pathname.split("/");

  // Letztes Segment holen
  const lastSegment = segments[segments.length - 1];

  let actions = pathnames.actions;

  const isAction = actions.includes(lastSegment);

  let loggedIn = user;

  return (
    <div className="drawer z-30">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full fixed top-0 z-10">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <div className="mx-2 flex-1 px-2 max-sm:hidden">
            <div></div>
            {!loggedIn && <div>{dict.generall.projectName}</div>}
            <div className="flex gap-4">
              {loggedIn && (
                <Link href={`/${lang}/dashboard`}>
                  <div
                    className={`p-2 rounded ${
                      pathname.includes("/dashboard")
                        ? "bg-primary text-white"
                        : "text-base-content"
                    }`}
                    title="Dashboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={ICONS.home}
                      />
                    </svg>
                  </div>
                </Link>
              )}

              {loggedIn && (
                <Link href={`/${lang}/templates`}>
                  <div
                    className={`p-2 rounded ${
                      pathname.includes("/templates")
                        ? "bg-primary text-white"
                        : "text-base-content"
                    }`}
                    title="Templates"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={ICONS.puzzle}
                      />
                    </svg>
                  </div>
                </Link>
              )}

              {loggedIn && (
                <Link href={`/${lang}/styleguide`}>
                  <div
                    className={`p-2 rounded ${
                      pathname.includes("/styleguide")
                        ? "bg-primary text-white"
                        : "text-base-content"
                    }`}
                    title="Styleguide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={ICONS.color}
                      />
                    </svg>
                  </div>
                </Link>
              )}

              {loggedIn && (
                <Link href={`/${lang}/content`}>
                  <div
                    className={`p-2 rounded ${
                      pathname.includes("/content")
                        ? "bg-primary text-white"
                        : "text-base-content"
                    }`}
                    title="Content"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={ICONS.stack}
                      />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
          {isAction && (
            <div className="flex-none lg:block">
              <button className="btn bg-transparent border-none text-transparent">
                {dict.styleguide.save}
              </button>
            </div>
          )}
        </div>
        {/* Platz für den Seiteninhalt */}
        <div className="mt-16  bg-base-100">
          {/* Hier werden Kinderkomponenten platziert */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-3" className="drawer-overlay">
          {dict.generall.projectName}
        </label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-16">
          <li>
            <Link href={`/${lang}/`}>{dict.sidebar.home}</Link>
          </li>
          {!loggedIn && (
            <li>
              <Link href={`/${lang}/login`}>{dict.sidebar.login}</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link href={`/${lang}/dashboard`}>{dict.sidebar.dashboard}</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link href={`/${lang}/templates`}>{dict.sidebar.templates}</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link href={`/${lang}/styleguide`}>
                {dict.sidebar.styleguide}
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link href={`/${lang}/content`}>{dict.sidebar.list}</Link>
            </li>
          )}
          <li>
            <Link href={`/${lang}/about`}>{dict.sidebar.about}</Link>
          </li>
          <li>
            <Link href={`/${lang}/join`}>{dict.sidebar.join}</Link>
          </li>
          <li>
            <Link href={`/${lang}/impressum`}>{dict.sidebar.impressum}</Link>
          </li>
          {loggedIn && (
            <form
              action={logoutAction}
              className="mt-10 flex items-center justify-center"
            >
              <button type={"submit"} className="btn btn-primary w-full">
                {dict.sidebar.logout}
              </button>
            </form>
          )}
        </ul>
      </div>
    </div>
  );
}
