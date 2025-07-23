import { getDictionary } from "@/lib/getDictionary";
import LoginForm from "@/components/login/loginForm";

/**
 * `LoginPage` ist die Anmeldeseite der Anwendung.
 *
 * Diese Seite ist **öffentlich zugänglich**, aber **nur für nicht angemeldete Benutzer** gedacht.
 * Angemeldete Benutzer werden automatisch zum Dashboard weitergeleitet (diese Logik liegt in der `LoginForm`-Komponente bzw. der Authentifizierungslogik).
 *
 * Die Seite ist **nicht durch Middleware geschützt**.
 *
 * ## Funktionen:
 * - Zeigt einen Begrüßungstext sowie eine Beschreibung des Logins.
 * - Stellt ein Login-Formular bereit über den importierten `LoginForm`-Component.
 * - Unterstützt Mehrsprachigkeit durch dynamisches Laden des Sprach-Wörterbuchs via `getDictionary(lang)`.
 *
 * ## Technische Details:
 * - Die Sprache wird über den URL-Parameter `lang` bestimmt, Standard ist `"de"`.
 * - Die Seite wird **serverseitig gerendert (SSR)**.
 * - Die Login-Funktionalität wird über eine separate Action in `@/app/actions/userActions.js` gehandhabt.
 *
 * @async
 * @function LoginPage
 * @param {Object} props - Serverseitige Parameter
 * @param {Object} props.params - Objekt mit URL-Parametern
 * @param {string} props.params.lang - Sprachcode, z. B. `"de"` oder `"en"` (optional)
 *
 * @returns {Promise<JSX.Element>} Die gerenderte Login-Seite als React-Komponente
 */

export default async function LoginPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="p-7">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row-reverse md:items-start">
          <div className="text-center md:text-left w-full  mb-3 lg:w-2/3">
            <h1 className="headline">{dict.login.login}</h1>
            <p className="pt-3 text-left px-2 md:pl-0 md:pt-6">
              {dict.login.description}
            </p>
            <p className="pb-3 pt-1 text-left px-2 md:pl-0 md:py-3">
              {dict.login.explenation}
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <LoginForm dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
