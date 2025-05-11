import { getDictionary } from "@/lib/getDictionary";

/**
 * Examples Seite der Anwendung.
 * Diese Seite ist eine Public Seite und kann von jedem Benutzer aufgerufen werden.
 * Hier ist beschrieben wie man den Veran für dieses Tool anmelden kann
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function JoinPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.join.title}</h1>
      <p>{dict.join.description}</p>
    </div>
  );
}
