import { getDictionary } from "@/lib/getDictionary";

/**
 * About Seite der Anwendung.
 * Diese Seite ist eine Public Seite und kann von jedem Benutzer aufgerufen werden.
 * Sie binhaltet Information über das Projekt
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function AboutPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      {JSON.stringify(dict)}
      <h1 className="mb-5 text-5xl font-bold">{dict.about.title}</h1>
      <p>{dict.about.description}</p>
    </div>
  );
}
