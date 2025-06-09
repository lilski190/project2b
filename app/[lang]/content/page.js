import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import BasicTable from "@/components/tables/BasicTable";
import Content from "@/dummidaten/content.JSON";
import { loadAllContent } from "@/app/actions/contentAction";

/**
 * Styleguide Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Hier ist die Liste von dem erstellten Content der Vereine.
 * Die Seite wird server-seitig gerendert und die Daten zu der Sprache werden über die Funktion getDictionary geladen.
 */
export default async function ContentPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  let headlines = ["id", "Titel", "Date", "Tags"];
  const data = await loadAllContent();
  const contentArray = data?.data;

  console.log("loades Array", contentArray);
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      {JSON.stringify(dict)}
      <h1 className="mb-5 text-5xl font-bold">{dict.content.title}</h1>
      <p>{dict.content.description}</p>
      TODO: Filter liste nach Kategorien wie z.B Tags oder date
      <div className=" ">
        <BasicTable headlines={headlines} content={contentArray} />
      </div>
    </div>
  );
}
