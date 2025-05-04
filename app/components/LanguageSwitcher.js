"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] || "de";

  const handleLanguageChange = (lang) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = lang;
    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };

  const langLabels = {
    de: "Deutsch",
    en: "English",
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
        {["de", "en"].map((lang) => (
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
