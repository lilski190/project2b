import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import BasicTable from "@/components/tables/BasicTable";
import Content from "@/dummidaten/content.JSON";
import { loadAllContent } from "@/app/actions/contentAction";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const VereinTags = cookieStore.get("verein_tags")?.value;

  let headlines = ["ID", "Titel", "Date", "Author", "Tags"];
  const data = await loadAllContent();
  const contentArray = data?.data;

  console.log("loades Array", contentArray);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-md:p-3">
      {VereinTags}
      <h1 className="headline">{dict.content.title}</h1>
      <p className="mt-2 baseText">{dict.content.description}</p>
      <div className="mt-6 ">
        <BasicTable
          headlines={headlines}
          content={contentArray}
          filter={JSON.parse(VereinTags)}
        />
      </div>
    </div>
  );
}
