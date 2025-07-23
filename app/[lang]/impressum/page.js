import { getDictionary } from "@/lib/getDictionary";

/**
 * `ImpressumPage` ist eine öffentlich zugängliche Seite, die die gesetzlich vorgeschriebenen
 * Kontakt- und Haftungshinweise der Anwendung bereitstellt.
 *
 * Diese Seite ist **nicht geschützt** und kann von allen Benutzern ohne Login aufgerufen werden.
 *
 * Die Inhalte (wie Name, Adresse, E-Mail, rechtliche Hinweise, Ressourcen) werden über
 * das Sprach-Wörterbuch `dict` bereitgestellt, das serverseitig durch `getDictionary(lang)` geladen wird.
 *
 * Die Sprache wird über den URL-Parameter `lang` bestimmt. Falls nicht angegeben, wird `"de"` als Standard verwendet.
 *
 * Abschnitte auf der Seite:
 * - Verantwortliche Person/Institution
 * - Kontaktinformationen
 * - Haftungsausschluss
 * - Hinweise zu verwendeten externen Ressourcen (z. B. Icons, Fonts, UI-Libraries)
 *
 * @async
 * @function ImpressumPage
 * @param {Object} props - Serverseitige Parameter für die Seite
 * @param {Object} props.params - URL-Parameter-Objekt
 * @param {string} props.params.lang - Sprachcode, z. B. `"de"` oder `"en"` (optional)
 *
 * @returns {Promise<JSX.Element>} Die gerenderte Impressum-Seite als React-Komponente
 */
export default async function ImpressumPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="max-w-3xl mx-auto p-6 my-6">
      <h1 className="mb-6 text-4xl font-bold text-center">
        {dict.impressum.title}
      </h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          {dict.impressum.section1Title}
        </h2>
        <p>{dict.impressum.name}</p>
        <p>{dict.impressum.addressLine1}</p>
        <p>{dict.impressum.addressLine2}</p>
        <p>
          {dict.impressum.emailLabel}:{" "}
          <a
            href="mailto:drabinsk@th-brandenburg.de"
            className="text-info underline"
          >
            drabinsk@th-brandenburg.de
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          {dict.impressum.section2Title}
        </h2>
        <p>{dict.impressum.name}</p>
        <p>{dict.impressum.addressLine1}</p>
        <p>{dict.impressum.addressLine2}</p>
      </section>

      <section className="mb-6">
        <p>{dict.impressum.projectNote}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          {dict.impressum.section3Title}
        </h2>
        <p>{dict.impressum.liabilityText1}</p>
        <p className="mt-2">{dict.impressum.liabilityText2}</p>
      </section>

      <section className="mt-10 text-sm">
        <h2 className="text-2xl font-semibold mb-4">
          {dict.impressum.resourcesTitle}
        </h2>
        <p className="mb-2">{dict.impressum.resourcesIntro}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {dict.impressum.resourceHeroicons}{" "}
            <a href="https://heroicons.com" className="text-info underline">
              Heroicons
            </a>{" "}
            (MIT-Lizenz)
          </li>
          <li>
            {dict.impressum.resourceFreepik}{" "}
            <a href="https://www.freepik.com" className="text-info underline">
              Freepik
            </a>{" "}
            {dict.impressum.resourceFreepik2}
          </li>
          <li>
            {dict.impressum.resourceGoogleFonts}{" "}
            <a href="https://fonts.google.com" className="text-info underline">
              Google Fonts
            </a>{" "}
            (OFL-Lizenz)
          </li>
          <li>
            {dict.impressum.resourceDaisyui}{" "}
            <a href="https://daisyui.com" className="text-info underline">
              daisyUI
            </a>{" "}
            {dict.impressum.resourceTailwind}{" "}
            <a href="https://tailwindcss.com" className="text-info underline">
              Tailwind CSS
            </a>
          </li>
        </ul>
        <p className="mt-4">{dict.impressum.resourcesOutro}</p>
      </section>
    </div>
  );
}
