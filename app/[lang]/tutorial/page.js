import { getDictionary } from "@/lib/getDictionary";

/**
 * Examples Seite der Anwendung.
 * Diese Seite ist eine Public Seite und kann von jedem Benutzer aufgerufen werden.
 * Hier ist eine Anleitung zur Verwendung des Tools.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function TutorialPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      {JSON.stringify(dict)}
      <h1 className="mb-5 text-5xl font-bold">{dict.tutorial.title}</h1>
      <p>{dict.tutorial.description}</p>
    </div>
  );
}
