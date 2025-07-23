import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import BasicCard from "@/components/cards/BasicCard";

/**
 * TemplatesPage - Seite zur Auswahl von Stylingvorlagen (Templates)
 *
 * Diese Seite ist eine private Seite, die nur für angemeldete Benutzer sichtbar ist.
 * Der Zugriff ist durch eine Middleware geschützt, die Nutzer authentifiziert.
 *
 * Die Sprache der Seite wird über den URL-Parameter "lang" gesteuert.
 * Die notwendigen Texte und Beschreibungen werden serverseitig über die Funktion `getDictionary` geladen.
 *
 * Inhalt:
 * - Anzeige einer Liste von Stylingvorlagen, die für verschiedene Komponentenformate verwendet werden können.
 * - Aktuell sind drei Templates als Array definiert, die per `.map()` in einzelne `BasicCard`-Komponenten gerendert werden.
 * - Jede Template-Karte zeigt Titel, Beschreibung, ein Bild und eine Aktion (z.B. "Erstellen"-Button) mit entsprechenden Parametern.
 *
 * Falls der Benutzer nicht angemeldet ist, wird er auf die Login-Seite weitergeleitet.
 *
 * @param {Object} props - Eigenschaften der Seite
 * @param {Object} props.params - URL-Parameter mit Sprachangabe (z.B. { lang: "de" })
 *
 * @returns {JSX.Element} Gerenderte Seite mit Template-Übersicht
 */

export default async function TemplatesPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  let title = dict.templates.titles;
  let descriptions = dict.templates.descriptions;

  let TempaltesArray = [
    {
      title: title[0] || "Image with text",
      text: descriptions[0] || "Create a new Component with an Image and Text",
      img: "basic/mockups/ImgText.jpg",
      action: {
        text: dict.templates.action || "Create",
        url: "/create",
        parameter: ["template", "text_with_image"],
      },
    },
    {
      title: title[1] || "Image Gallery",
      text: descriptions[1] || "Create a new Component with mulitple Images",

      img: "basic/mockups/Gallery.jpg",
      action: {
        text: dict.templates.action || "Create",
        url: "/create",
        parameter: ["template", "image_gallery"],
      },
    },
    {
      title: title[2] || "Grafic with text",
      text: descriptions[2] || "Create a new Component with an Grafic and Text",

      img: "basic/mockups/TextGrafic.jpg",
      action: {
        text: dict.templates.action || "Create",
        url: "/create",
        parameter: ["template", "text_with_graphic"],
      },
    },
  ];

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-md:p-3">
      <h1 className="headline">{dict.templates.title}</h1>
      <p className="mt-2 baseText">{dict.templates.description}</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {TempaltesArray.map((template, index) => (
          <div key={"template_" + template + "_" + index} className="h-full ">
            <BasicCard
              title={template.title}
              text={template.text}
              action={template.action}
              img={template.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
