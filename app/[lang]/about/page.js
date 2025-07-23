import { getDictionary } from "@/lib/getDictionary";

/**
 * `AboutPage` ist eine serverseitig gerenderte öffentliche Seite, die Hintergrundinformationen über das Projekt anzeigt.
 *
 * Die Inhalte werden abhängig von der Sprache aus dem Sprach-Dictionary geladen, das über die `getDictionary`-Funktion bereitgestellt wird.
 * Die Sprache wird aus dem URL-Parameter `lang` entnommen. Ist kein Parameter vorhanden, wird standardmäßig `"de"` verwendet.
 *
 * Die Seite zeigt verschiedene textbasierte Abschnitte über das Projekt an – z. B. Hintergrund, Idee, Features und Haftungsausschluss.
 *
 * @async
 * @function AboutPage
 * @param {Object} props - Serverseitige Props der Seite
 * @param {Object} props.params - URL-Parameter-Objekt, erwartet ein `lang`-Feld zur Sprachauswahl
 * @param {string} props.params.lang - Sprachcode (z. B. `"de"`, `"en"`)
 *
 * @returns {Promise<JSX.Element>} Das gerenderte JSX der About-Seite
 */
export default async function AboutPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 justify-items-stretch">
      <div className="bg-neutral w-full h-full "></div>
      <div className="p-3 pl-6 w-5/6">
        <h2 className="headline my-3">{dict.about.title}</h2>
        <p className="baseText my-3 ">{dict.about.description}</p>
      </div>

      <div className="p-3 pr-6 justify-self-end text-right w-5/6">
        <h2 className="headline my-3">
          {dict.about.section_headings.background}
        </h2>
        <p className="baseText my-3 ">{dict.about.background}</p>
      </div>
      <div className="bg-neutral w-full h-full"></div>

      <div className="bg-neutral w-full h-full "></div>
      <div className="p-3 pl-6 w-5/6">
        <h2 className="headline my-3">{dict.about.section_headings.idea}</h2>
        <p className="baseText my-3 ">{dict.about.idea}</p>
      </div>

      <div className="p-3 pr-6 justify-self-end text-right w-5/6">
        <h2 className="headline my-3">
          {dict.about.section_headings.features}
        </h2>
        <p className="baseText my-3 ">{dict.about.features}</p>
      </div>
      <div className="bg-neutral w-full h-full"></div>

      <div className="bg-neutral w-full h-full "></div>
      <div className="p-3 pl-6 w-5/6">
        <h2 className="headline my-3">
          {dict.about.section_headings.disclaimer}
        </h2>
        <p className="baseText my-3 ">{dict.about.disclaimer}</p>
      </div>
    </div>
  );
}
