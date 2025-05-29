import { getUserAction } from "@/app/actions/userActions";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";
import CreateForm from "./CreateForm";
import CreatePreview from "./CreatePreview";

//Alle Descriptoren der Templates Importieren
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
  test,
};

export default async function CreatePage({ params, searchParams }) {
  const user = await getUserAction();
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  const sourceKey = searchParams.template || "dataA"; // default fallback

  const selectedData = dataMap[sourceKey];

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.create.title}</h1>
      <p>{dict.create.description}</p>
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <CreatePreview dict={dict} data={selectedData.preview} />
        <CreateForm dict={dict} data={selectedData.form} />
      </div>
    </div>
  );
}
