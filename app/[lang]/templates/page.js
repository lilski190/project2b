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
  let title = dict.templates.titles;
  let descriptions = dict.templates.descriptions;

  console.log("title", title);
  console.log("descriptions", descriptions);
  console.log("action", dict.templates);
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
        parameter: ["template", "text_with_image"], //TODO: image_gallery
      },
    },
    {
      title: title[2] || "Grafic with text",
      text: descriptions[2] || "Create a new Component with an Grafic and Text",

      img: "basic/mockups/TextGrafic.jpg",
      action: {
        text: dict.templates.action || "Create",
        url: "/create",
        parameter: ["template", "text_with_image"], //TODO: text_with_graphic
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
