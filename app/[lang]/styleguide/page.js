import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import { getStyleguideAction } from "@/app/actions/styleguideAction";
import StyleguideForm from "./StyleguideForm";
import { cookies } from "next/headers";
/**
 * `StyleguidePage` ist die Konfigurationsseite für den Styleguide eines Vereins.
 *
 * Diese Seite ist **nur für authentifizierte Benutzer zugänglich** und durch Middleware geschützt.
 * Sie dient dazu, die visuellen Stilmittel (Farben, Schriftarten, Logos etc.) eines Vereins zu verwalten und anzupassen.
 *
 * ## Funktionen:
 * - Lädt den aktuell angemeldeten Benutzer über `getUserAction()`.
 * - Lädt sprachspezifische Texte und Labels über `getDictionary(lang)`.
 * - Lädt den aktuellen Styleguide des Vereins über `getStyleguideAction()`.
 * - Liest Vereinsinformationen (`verein_id` und `verein_name`) aus den Cookies.
 * - Übergibt alle nötigen Daten an die `StyleguideForm`-Komponente.
 * - Leitet Benutzer ohne gültige Session zur Login-Seite weiter.
 *
 * ## Technische Details:
 * - SSR (Server Side Rendering)
 * - Sprache wird dynamisch über den URL-Parameter `lang` bestimmt (Standard: `"de"`).
 * - Die Vereins-ID wird aus dem Cookie `verein_id` extrahiert und für Dateipfade formatiert.
 *
 * @async
 * @function StyleguidePage
 * @param {Object} props - Serverseitige Properties
 * @param {Object} props.params - URL-Parameter
 * @param {string} props.params.lang - Sprachcode (z. B. `"de"`, `"en"`)
 *
 * @returns {Promise<JSX.Element>} Die gerenderte Styleguide-Seite
 */
export default async function StyleguidePage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const styleguideData = await getStyleguideAction();

  const cookieStore = await cookies();
  const rawId = cookieStore.get("verein_id")?.value;
  const vereinId = rawId?.split("-")[0];
  const vereinName = cookieStore.get("verein_name")?.value;
  const vereinString = vereinName?.replace(/\s+/g, "_");
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="">
      <StyleguideForm
        dict={dict}
        data={styleguideData.stringify}
        folderID={vereinString + "_" + vereinId}
        lang={lang}
      />
    </div>
  );
}
