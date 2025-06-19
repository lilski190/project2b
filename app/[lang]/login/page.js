import { getDictionary } from "@/lib/getDictionary";
import LoginForm from "@/components/login/loginForm";

/**
 * Login Seite der Anwendung.
 * Diese Seite ist eine Public Seite die nur für nicht angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf die Dashboard Seite weitergeleitet.
 * Sie ist nicht durch die Middleware geschützt.
 * Im Login Formular wird die Funktion loginAction aufgerufen.
 * Diese Funktion ist in der Datei app/actions/userActions.js definiert.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
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
