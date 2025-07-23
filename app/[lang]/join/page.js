import { getDictionary } from "@/lib/getDictionary";

/**
 * `JoinPage` ist eine öffentliche Informationsseite der Anwendung, auf der erklärt wird,
 * wie man am Projekt teilnehmen kann.
 *
 * Diese Seite ist **öffentlich** zugänglich und benötigt **keine Authentifizierung**.
 *
 * Die Inhalte der Seite – wie Titel, Beschreibung und Teilnahme-Schritte – werden über
 * das Sprach-Wörterbuch (`dict`) geladen, welches serverseitig durch `getDictionary(lang)` bereitgestellt wird.
 *
 * Die Sprache der Seite wird über den URL-Parameter `lang` bestimmt. Standard ist `"de"`.
 *
 * Die Teilnahme-Schritte werden visuell durch das UI-Element `daisyUI steps` dargestellt.
 * Dabei werden dynamisch alle Einträge aus `dict.join.steps` durchiteriert.
 *
 * @async
 * @function JoinPage
 * @param {Object} props - Serverseitige Parameter
 * @param {Object} props.params - Objekt mit URL-Parametern
 * @param {string} props.params.lang - Sprachcode, z. B. `"de"` oder `"en"` (optional)
 *
 * @returns {Promise<JSX.Element>} Die gerenderte Join-Seite als React-Komponente
 */

export default async function JoinPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-1 justify-items-stretch">
      <div className="p-3 pl-6 w-5/6 col-span-2 ">
        <h2 className="headline my-3">{dict.join.title}</h2>
        <p className="baseText my-3 font-bold ">{dict.join.description}</p>
        <p className="baseText my-3 ">{dict.join.explenation}</p>
        <p className="baseText mt-3 font-bold ">{dict.join.closing}</p>
        <p className="baseText mt-1.5 font-bold">{dict.join.closing_02}</p>
      </div>
      <div className=" w-full h-full "></div>
      <div className="col-span-3">
        <h2 className="p-3 pl-6 w-5/6 headline my-3">
          {dict.join.steps_headline}
        </h2>
        <ul className="steps max-md:steps-vertical px-12 mb-12">
          {dict.join.steps.map((step, index) => (
            <li className="step step-primary" key={step.num + index}>
              <div
                key={index}
                className="flex h-full flex-col items-center max-md:items-start justify-start"
              >
                <div className="title mt-3">{step.num}</div>
                <div className="w-5/6 mt-3 max-md:text-left">
                  {step.description ? (
                    step.description
                  ) : (
                    <>
                      {step.description_01}{" "}
                      <a
                        href="mailto:drabinsk@th-brandenburg.de"
                        className="text-primary underline"
                      >
                        drabinsk@th-brandenburg.de
                      </a>{" "}
                      {step.description_02}
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
