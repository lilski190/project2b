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
