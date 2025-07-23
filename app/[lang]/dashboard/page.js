import { getUserAction } from "@/app/actions/userActions";
import { getLoginData } from "@/app/actions/authAction";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import StyleguideLoader from "@/components/wrapper/StyleguideLoader";
import Link from "next/link";
import IconTextCard from "@/components/cards/IconTextCard";
import { cookies } from "next/headers";
import VereinTopper from "@/components/structure/VereinTopper";

/**
 * `DashboardPage` ist die zentrale Startseite für angemeldete Benutzer nach dem Login.
 *
 * Diese Seite ist **privat** und durch Middleware geschützt. Unauthentifizierte Benutzer werden automatisch zur Login-Seite weitergeleitet.
 * Der aktuell angemeldete Benutzer wird serverseitig über `getUserAction()` identifiziert.
 *
 * Die Sprache der Seite wird über den URL-Parameter `lang` bestimmt (Standard: `"de"`).
 * Sprachabhängige Inhalte wie Überschriften und Beschreibungen werden über `getDictionary(lang)` geladen.
 *
 * Die Seite zeigt eine **Übersicht über die Hauptfunktionen der Anwendung**:
 * - **Styleguide**: Anpassung visueller Komponenten
 * - **Templates**: Übersicht und Verwaltung der Content-Templates
 * - **Content**: Anzeige und Verwaltung erstellter Inhalte
 *
 * Weitere wichtige Komponenten:
 * - `VereinTopper`: Zeigt Vereinsname und Mitgliedsnamen an (aus Cookies geladen)
 * - `StyleguideLoader`: Lädt globale Design-/Styleguide-Daten der Anwendung
 * - `IconTextCard`: Visuelle Repräsentation der Navigationseinträge
 *
 * @async
 * @function DashboardPage
 * @param {Object} props - Serverseitige Parameter für die Seite
 * @param {Object} props.params - URL-Parameter-Objekt
 * @param {string} props.params.lang - Sprachcode wie `"de"` oder `"en"` (optional, default: `"de"`)
 *
 * @returns {Promise<JSX.Element>} Das gerenderte Dashboard für angemeldete Benutzer
 */
export default async function DashboardPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();

  const vereinName = cookieStore.get("verein_name")?.value;

  const memberName = cookieStore.get("member_name")?.value;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="">
      <div className="-mb-5 z-0">
        <VereinTopper
          memberName={memberName}
          vereinName={vereinName}
          vereinText={dict.dashboard.title}
          memberText={dict.dashboard.welcome}
          bgColor={"var(--color-base-200)"}
        />
      </div>
      <div className="-mt-5 px-6 max-sm:px-3 pb-6">
        <StyleguideLoader />
        <div className="grid grid-cols-3 gap-4  z-30 ">
          <Link href={`/${lang}/styleguide`} className="w-full">
            <IconTextCard
              title={dict.dashboard.title_styleguide}
              text={dict.dashboard.description_styleguide}
              icon="color"
            />
          </Link>

          <Link href={`/${lang}/templates`}>
            <IconTextCard
              title={dict.dashboard.title_templates}
              text={dict.dashboard.description_templates}
              icon="puzzle"
            />
          </Link>
          <Link href={`/${lang}/content`}>
            <IconTextCard
              title={dict.dashboard.title_list}
              text={dict.dashboard.description_list}
              icon="stack"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
