import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

/**
 * Home-Seite der Anwendung (Startseite)
 *
 * Diese Seite ist öffentlich zugänglich (Public Page) und wird geladen,
 * wenn ein Benutzer die Anwendung besucht.
 *
 * Funktionen und Inhalte:
 * - Begrüßungstext und Einführung in die Anwendung.
 * - Navigation zu Login- und Join-Seiten.
 * - Link zur "About"-Seite für weitere Informationen.
 * - Texte werden basierend auf dem Sprachparameter `lang` aus der URL geladen
 *   und über `getDictionary` bereitgestellt.
 *
 * @param {Object} props
 * @param {Object} props.params - URL-Parameter, inkl. `lang` für die Sprache.
 *
 * @returns {JSX.Element} Die gerenderte Startseite mit lokalisierter UI.
 */
export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 px-4 sm:px-8 py-10">
      <section className="flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left lg:ml-12 lg:mt-12">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 headline">
            {dict.home.welcome_01} – <br className="hidden sm:inline" />
            {dict.home.welcome_02}
          </h1>

          <p className="text-base-content mb-3 baseText">
            {dict.home.intro_text}
          </p>

          <div className="flex gap-3 items-center">
            <span className="text-base-content baseText">
              {dict.home.more_info_text}
            </span>
            <Link href="/about" className="underline hover:font-bold">
              {dict.home.more_info_button}
            </Link>
          </div>

          <div className="grid grid-cols-2 mt-6 gap-6">
            <div>
              <Link href="/login" className="underline hover:font-bold">
                <button className="btn btn-primary w-full">
                  {dict.home.login_button}
                </button>
              </Link>
              <div className="mt-3 text-left baseText">
                {dict.home.login_hint}
              </div>
            </div>
            <div>
              <Link href="/join" className="underline hover:font-bold">
                <button className="btn btn-primary w-full">
                  {dict.home.join_button}
                </button>
              </Link>
              <div className="mt-3 text-left baseText">
                {dict.home.join_hint}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center"></div>
      </section>
    </div>
  );
}
