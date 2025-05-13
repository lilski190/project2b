import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import StyleguideLoader from "@/components/wrapper/StyleguideLoader";

/**
 * Dashboard Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function DashboardPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  if (!user) {
    redirect("/login");
  }

  //TODO: LOAD Styleguide Data
  //THEN Load in Styleguide date in Local Storage

  return (
    <div>
      <StyleguideLoader />
      <h1 className="mb-5 text-5xl font-bold">{dict.dashboard.title}</h1>
      <h1>
        {dict.dashboard.welcome} : {user.email}
      </h1>
    </div>
  );
}
