"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * LanguageSwitcher-Komponente
 *
 * Eine React-Komponente für die clientseitige Sprachumschaltung über ein Dropdown-Menü.
 * Sie analysiert die aktuelle URL, erkennt die aktuelle Sprache und ermöglicht dem Benutzer,
 * per Klick auf eine andere Sprache zu wechseln. Die URL wird entsprechend angepasst und
 * die Navigation erfolgt über Next.js `router.push`.
 *
 * Unterstützte Sprachen:
 * - Deutsch (`de`)
 * - Englisch (`en`)
 * - Leichte Sprache (`deLS`)
 *
 * Die Komponente ist mit Tailwind CSS und DaisyUI gestylt.
 *
 * @returns {JSX.Element} Ein Dropdown-Menü zur Auswahl der Sprache.
 *
 * @example
 * <LanguageSwitcher />
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLang = pathname.split("/")[1] || "de";

  const handleLanguageChange = (lang) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = lang;
    const newPath = `/${segments.join("/")}`;
    const query = searchParams.toString();
    router.push(`${newPath}${query ? `?${query}` : ""}`);
  };
  const langLabels = {
    de: "Deutsch",
    en: "English",
    deLS: "Leichte Sprache",
  };

  return (
    <div className="dropdown dropdown-end h-8 ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
        🌐 {langLabels[currentLang]}
      </div>
      <div></div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {["de", "en", "deLS"].map((lang) => (
          <li key={lang}>
            <button
              onClick={() => handleLanguageChange(lang)}
              className={`w-full text-left px-3 py-2 rounded-md ${
                lang === currentLang
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200"
              }`}
            >
              {langLabels[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
