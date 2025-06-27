import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

/**
 * Startseite der Anwendung.
 * Diese Seite wird angezeigt, wenn der Benutzer die Anwendung ohne spezifische Route aufruft.
 * Sie kommt von einem Default Setup Projekt das ich für Next.js Projektes mit Supabase aufgesetzt habe.
 */
export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200">
      {JSON.stringify(dict)}
      <div className="hero min-h-screen">
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{dict.home.title}</h1>
            <p className="mb-5">{dict.home.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
