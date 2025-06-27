import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import CreateForm from "./CreateForm";
import CreatePreview from "./CreatePreview";
import { getSpecificContentAction } from "@/app/actions/contentAction";
import { cookies } from "next/headers";

//Alle Descriptoren der Templates Importieren

import text_with_image from "./descriptors/text_with_image.json";
import text_with_image_and_graphic from "./descriptors/text_with_image_and_graphic.json";
import text_with_graphic from "./descriptors/text_with_graphic.json";
import image_with_graphic from "./descriptors/image_with_graphic.json";
import image_gallery from "./descriptors/image_gallery.json";
import test from "./descriptors/test.json";

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
  text_with_image,
  text_with_image_and_graphic,
  text_with_graphic,
  image_with_graphic,
  image_gallery,
  test,
};

export default async function CreatePage({ params, searchParams }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const sourceKeyAwait = await searchParams;
  const cookieStore = await cookies();
  const rawId = cookieStore.get("verein_id")?.value;
  const vereinId = rawId?.split("-")[0];
  const vereinName = cookieStore.get("verein_name")?.value;
  const vereinTags = cookieStore.get("verein_tags")?.value;
  const author = cookieStore.get("member_name")?.value;

  const sourceKey = (sourceKeyAwait.template || "test").trim();
  const contentID = sourceKeyAwait.content || 0;

  const selectedData = dataMap[sourceKey];
  console.log("seelcted data", selectedData, sourceKey);

  let contentData;
  let authors;
  let selectedTags;
  let title;
  if (contentID != 0) {
    let loadedData = await getSpecificContentAction(contentID);
    console.log("loadedData XY: ", loadedData);
    contentData = loadedData.data[0].content;
    authors = loadedData.data[0].author;
    if (!authors.includes(author)) {
      authors.push(author);
    }
    selectedTags = loadedData.data[0].tags;
    title = loadedData.data[0].title;
    console.log("loaded Content: ", contentData);
  } else {
    contentData = selectedData.form;
    authors = [author];
    selectedTags = [];
    title = "";
    console.log("loaded new ", contentData);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="pt-6 max-md:pt-3">
      <h1 className="px-6  max-md:px-3 headline">{dict.create.title}</h1>
      <p className="px-6  max-md:px-3 mt-2 baseText ">
        {dict.create.description}
      </p>
      <div className="grid grid-cols-2 max-md:grid-cols-1 mt-6">
        <CreatePreview dict={dict} data={selectedData.preview} />
        <CreateForm
          dict={dict.create}
          data={contentData}
          template={sourceKey}
          contentID={contentID}
          vereinID={vereinName + "_" + vereinId}
          VereinTags={vereinTags}
          selectedTags={selectedTags}
          title={title}
          author={authors}
        />
      </div>
    </div>
  );
}
