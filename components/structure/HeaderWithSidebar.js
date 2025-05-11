"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
/**
 * HeaderWithSidebar Komponent
 * Dieser Komponent ist ein Header mit einer Sidebar, die Links zu verschiedenen Seiten enthält.
 * Die Sidebar ist standardmäßig ausgeblendet und kann durch Klicken auf das Hamburger-Menü-Symbol geöffnet werden.
 * Das Styling erfolgt über Tailwind CSS-Klassen und DaisyUI-Klassen.
 * @param {String} lang - Die aktuelle Sprache der Anwendung, die in der URL verwendet wird.
 */
export default function HeaderWithSidebar({ lang }) {
  return (
    <div className="drawer">
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
          <div className="mx-2 flex-1 px-2">Projekttitel: Vereinsstyle</div>
          <div className="flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
        {/* Platz für den Seiteninhalt */}
        <div className="mt-16  bg-base-100">
          {/* Hier werden Kinderkomponenten platziert */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <Link href={`/${lang}/`}>Homepage</Link>
          </li>
          <li>
            <Link href={`/${lang}/login`}>Login</Link>
          </li>
          <li>
            <Link href={`/${lang}/dashboard`}>Dashboard</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>About</Link>
          </li>
          <li>
            <Link href={`/${lang}/collection`}>Collection</Link>
          </li>
          <li>
            <Link href={`/${lang}/exmaples`}>Beispiele</Link>
          </li>
          <li>
            <Link href={`/${lang}/tutorial`}>Tutorial</Link>
          </li>
          <li>
            <Link href={`/${lang}/join`}>Verein anmelden</Link>
          </li>
          <li>
            <Link href={`/${lang}/styleguide`}>Vereinsstyle</Link>
          </li>
          <li>
            <Link href={`/${lang}/templates`}>Styleing Tempaltes</Link>
          </li>
          <li>
            <Link href={`/${lang}/content`}>Contentliste</Link>
          </li>
          <li>
            <Link href={`/${lang}/create`}>Content erstellen</Link>
          </li>
          <li>
            <Link href={`/${lang}/management`}>Vereinsmanagement</Link>
          </li>
          <li>
            <Link href={`/${lang}/impressum`}>Impressum</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
