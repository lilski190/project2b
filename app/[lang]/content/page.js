import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import BasicTable from "@/components/tables/BasicTable";
import Content from "@/dummidaten/content.JSON";
import { loadAllContent } from "@/app/actions/contentAction";
import { cookies } from "next/headers";

/**
 * `ContentPage` ist eine serverseitig gerenderte, geschützte Seite zur Anzeige der Inhalte (Content) eines Vereins.
 *
 * Diese Seite ist **privat** und nur für angemeldete Benutzer zugänglich – der Zugriff wird durch Middleware und einen
 * serverseitigen Authentifizierungscheck (`getUserAction`) abgesichert.
 *
 * Die Sprache der Seite wird über den URL-Parameter `lang` bestimmt. Standard ist `"de"`.
 * Die sprachspezifischen Texte werden mittels `getDictionary(lang)` geladen.
 *
 * Vereins-Tags werden aus den Cookies geladen (`verein_tags`) und als Filter an die Tabelle weitergegeben.
 * Die Inhalte selbst werden über den Server-Action `loadAllContent()` geladen und an die `BasicTable`-Komponente übergeben.
 *
 * Die `BasicTable` erhält folgende Props:
 * - `headlines`: Spaltentitel, sprachabhängig
 * - `content`: Datenarray (Content-Einträge)
 * - `filter`: Filterbare Vereins-Tags (aus Cookies)
 * - `colKeys`: Schlüssel für die Tabellenspalten (z. B. `"id"`, `"title"`, `"tags"`, etc.)
 *
 * Wenn kein Benutzer authentifiziert ist, erfolgt ein Redirect zur Login-Seite.
 *
 * @async
 * @function ContentPage
 * @param {Object} props - Serverseitige Props
 * @param {Object} props.params - URL-Parameter-Objekt
 * @param {string} props.params.lang - Sprachcode (z. B. `"de"`, `"en"`); `"de"` ist Standardwert
 *
 * @returns {Promise<JSX.Element>} Das gerenderte JSX für die geschützte Content-Liste
 */
export default async function ContentPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const VereinTags = cookieStore.get("verein_tags")?.value;

  let headlines = dict.content.headers;
  let colKeys = ["id", "title", "last_update", "author", "tags"];
  const data = await loadAllContent();
  const contentArray = data?.data;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-md:p-3">
      <h1 className="headline">{dict.content.title}</h1>
      <p className="mt-2 baseText">{dict.content.description}</p>
      <div className="mt-6 ">
        <BasicTable
          headlines={headlines}
          content={contentArray}
          filter={JSON.parse(VereinTags)}
          colKeys={colKeys}
        />
      </div>
    </div>
  );
}
