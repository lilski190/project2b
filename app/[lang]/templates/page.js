import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import BasicCard from "@/components/cards/BasicCard";

/**
 * Styleguide Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Hier ist eine Liste der Stylingvoralgen die für verschiedene Formate verwendet werden können.
 * Die Seite wird server-seitig gerendert und die Daten zu der Sprache werden über die Funktion getDictionary geladen.
 */
export default async function TemplatesPage({ params }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  let TempaltesArray = [
    {
      title: "Bild mit Text",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "text_with_image"],
      },
    },
    {
      title: "Bild mit Grafik",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "image_with_graphic"],
      },
    },
    {
      title: "Bilder Galerie",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "image_gallery"],
      },
    },
    {
      title: "Text mit Graifik",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "text_with_graphic"],
      },
    },
    {
      title: "Text mit Bild und Grafik",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "text_with_image_and_graphic"],
      },
    },
    {
      title: "Test Component",
      text: "das ist der Beschreibungstext für diesen Component",
      img: "img/vorschaubild",
      action: {
        text: "Neues erstellen",
        url: "/create",
        parameter: ["template", "test"],
      },
    },
  ];

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-md:p-3">
      {JSON.stringify(dict.templates)}
      <h1 className="mb-5 headline">{dict.templates.title}</h1>
      <p className="baseText">{dict.templates.description}</p>

      <div className="grid grid-cols-3 gap-4">
        {TempaltesArray.map((template, index) => (
          <div key={"template_" + template + "_" + index}>
            <BasicCard
              title={template.title}
              text={template.text}
              action={template.action}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
