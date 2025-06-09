import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";

/**
 * Styleguide Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Hier sollen die Mitarbeiter des Vereins verwaltet werden können.
 * Die Seite wird server-seitig gerendert und die Daten zu der Sprache werden über die Funktion getDictionary geladen.
 */
export default async function ManagementPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      {JSON.stringify(dict)}
      <h1 className="mb-5 text-5xl font-bold">{dict.management.title}</h1>
      <p>Das ist das extra wenn ich noch zeit habe</p>
      <p>{dict.management.description}</p>
    </div>
  );
}
