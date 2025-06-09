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
    <div style={{ padding: 24 }}>
      {JSON.stringify(dict)}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{dict.login.login}</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
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
