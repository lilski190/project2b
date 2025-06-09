import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import CreateForm from "./CreateForm";
import CreatePreview from "./CreatePreview";
import { getSpecificContentAction } from "@/app/actions/contentAction";

//Alle Descriptoren der Templates Importieren
import test from "./descriptors/test.json";
import text_with_image from "./descriptors/text_img.json";
import text_with_image_and_graphic from "./descriptors/text_img_graf.json";
import text_with_graphic from "./descriptors/text_graf.json";
import image_with_graphic from "./descriptors/img_graf.json";
import image_gallery from "./descriptors/img_gall.json";

/**
 * Styleguide Seite der Anwendung.
 * Diese Seite ist eine Private Seite die nur für angemeldete Benutzer sichtbar ist.
 * Nach dem Login wird der Benutzer auf diese Seite weitergeleitet.
 * Sie ist durch die Middleware geschützt.
 * Der Benutzer wird über die Funktion getUserAction geladen.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Das ist die Detailseite für den Content wo er bearbeitet werden kann.
 * Die Seite wird server-seitig gerendert und die Daten zu der Sprache werden über die Funktion getDictionary geladen.
 */

const dataMap = {
  test,
  text_with_image,
  text_with_image_and_graphic,
  text_with_graphic,
  image_with_graphic,
  image_gallery,
};

export default async function CreatePage({ params, searchParams }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const sourceKeyAwait = await searchParams;

  const sourceKey = sourceKeyAwait.template; // default fallback
  const contentID = sourceKeyAwait.content || 0;

  const selectedData = dataMap[sourceKey];

  let contentData = selectedData.form;
  if (contentID !== 0) {
    let loadedData = await getSpecificContentAction(contentID);
    contentData = loadedData.data[0].content;
    console.log("loaded Content: ", contentData);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      {JSON.stringify(dict)}
      <h1 className="mb-5 text-5xl font-bold">{dict.create.title}</h1>
      <p>{dict.create.description}</p>
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <CreatePreview dict={dict} data={selectedData.preview} />
        <CreateForm
          dict={dict}
          data={contentData}
          template={sourceKey}
          contentID={contentID}
        />
      </div>
    </div>
  );
}
