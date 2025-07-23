import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import CreateForm from "./CreateForm";
import CreatePreview from "./CreatePreview";
import { getSpecificContentAction } from "@/app/actions/contentAction";
import { cookies } from "next/headers";

import text_with_image from "./descriptors/text_with_image.json";
import text_with_image_and_graphic from "./descriptors/text_with_image_and_graphic.json";
import text_with_graphic from "./descriptors/text_with_graphic.json";
import image_gallery from "./descriptors/image_gallery.json";
import test from "./descriptors/test.json";

/**
 * `CreatePage` ist eine serverseitig gerenderte Seite für die Erstellung oder Duplikation von Content über ein dynamisches Template-System.
 *
 * Diese Seite ist **privat** und durch Middleware geschützt. Nur angemeldete Benutzer mit gültigen Session-Cookies können darauf zugreifen.
 *
 * Die Seite verwendet zwei Hauptkomponenten:
 * - `CreateForm`: Das Eingabeformular zur Content-Erstellung
 * - `CreatePreview`: Eine Vorschau des aktuell gewählten Templates mit Live-Daten aus dem LocalStorage
 *
 * Die Auswahl des Templates erfolgt über den URL-Parameter `template`. Ist kein Template angegeben, wird `"test"` als Fallback verwendet.
 * Wenn ein `content`-Parameter vorhanden ist, wird der bestehende Inhalt über `getSpecificContentAction` geladen.
 * Andernfalls wird ein neues Formular basierend auf der gewählten Template-Definition (`dataMap`) initialisiert.
 *
 * Die wichtigsten Daten (Vereinsname, Tags, Autorenname) werden aus den Cookies gelesen:
 * - `verein_id`
 * - `verein_name`
 * - `verein_tags`
 * - `member_name`
 *
 * Sprachabhängige Labels werden serverseitig über `getDictionary(lang)` geladen, basierend auf dem `lang`-URL-Parameter (Standard: `"de"`).
 *
 * @async
 * @function CreatePage
 * @param {Object} props - Serverseitige Parameter für die Seite
 * @param {Object} props.params - URL-Parameter-Objekt
 * @param {string} props.params.lang - Sprachcode wie `"de"` oder `"en"` (optional, default: `"de"`)
 * @param {Object} props.searchParams - Query-Parameter aus der URL
 * @param {string} [props.searchParams.template] - Gewählter Template-Key für die Content-Erstellung
 * @param {string|number} [props.searchParams.content] - Content-ID; `"0"` oder nicht vorhanden für neuen Content
 * @param {boolean|string} [props.searchParams.duplicate] - Flag, ob ein bestehender Inhalt dupliziert werden soll
 *
 * @returns {Promise<JSX.Element>} Die vollständige Seite zur Content-Erstellung mit Formular und Vorschau
 */
const dataMap = {
  text_with_image,
  text_with_image_and_graphic,
  text_with_graphic,
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
  const duplicate = sourceKeyAwait.duplicate || false;

  const selectedData = dataMap[sourceKey];

  let contentData;
  let authors;
  let selectedTags;
  let title;
  if (contentID != 0) {
    let loadedData = await getSpecificContentAction(contentID);
    contentData = loadedData.data[0].content;
    authors = loadedData.data[0].author;
    if (!authors.includes(author)) {
      authors.push(author);
    }
    selectedTags = loadedData.data[0].tags;
    title = loadedData.data[0].title;
    if (duplicate) {
      title = `${title} (Kopie)`;
      if (!authors.includes(author)) {
        authors.push(author);
      }
    }
  } else {
    contentData = selectedData.form;
    authors = [author];
    selectedTags = [];
    title = "";
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="">
      <div className="w-1/2 fixed max-md:fixed max-md:w-full z-10">
        <CreatePreview
          dict={dict}
          data={selectedData.preview}
          template={sourceKey}
        />
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="w-full aspect-square"></div>
        <div className="max-md:pt-24">
          <CreateForm
            dict={dict.create}
            data={contentData}
            template={sourceKey}
            contentID={contentID}
            duplicate={duplicate}
            vereinID={vereinName + "_" + vereinId}
            VereinTags={vereinTags}
            selectedTags={selectedTags}
            title={title}
            author={authors}
          />
        </div>
      </div>
    </div>
  );
}
