import { getDictionary } from "@/lib/getDictionary";

/**
 * About Seite der Anwendung.
 * Diese Seite ist eine Public Seite und kann von jedem Benutzer aufgerufen werden.
 * Sie binhaltet Information über das Projekt
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
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
