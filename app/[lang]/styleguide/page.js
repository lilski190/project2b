import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { getStyleguideAction } from "@/app/actions/styleguideAction";
import StyleguideForm from "./StyleguideForm";
/**
 * Styleguide Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Hier kann der Verein seinen Styleguide anpassen und verwalten.
 * Die Seite wird server-seitig gerendert und die Daten zu der Sprache werden über die Funktion getDictionary geladen.
 */
export default async function StyleguidePage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const styleguideData = await getStyleguideAction();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <StyleguideForm dict={dict} data={styleguideData} />
    </div>
  );
}
