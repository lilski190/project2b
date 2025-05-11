import { getDictionary } from "@/lib/getDictionary";

/**
 * Impressum Seite der Anwendung.
 * Diese Seite ist eine Public Seite und kann von jedem Benutzer aufgerufen werden.
 * Notwendinge Kontaktinformationen und rechtliche Hinweise.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function ImpressumPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.impressum.title}</h1>
      <p>Angaben gemäß § 5 TMG</p>
      <p>Lilian Drabinski </p>
      <p>Magdeburger Str. 50</p>
      <p>14770 Brandenburg an der Havel</p>
      <p>E-Mail: drabinsk@th-brandenburg.de</p>
      <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
      <p>Lilian Drabinski </p>
      <p>Magdeburger Str. 50</p>
      <p>14770 Brandenburg an der Havel</p>
      <p>
        Diese Website ein nicht-kommerzielles Hochschulprojekt im Rahmen des
        Studiengangs Digitale Medien an der THB.
      </p>
      <p>
        Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen
        wir keine Haftung für die Inhalte externer Links. Für den Inhalt der
        verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </div>
  );
}
