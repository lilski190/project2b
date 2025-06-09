import { getDictionary } from "@/lib/getDictionary";
import DefaultButton from "@/components/buttons/defaultButton";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import Colors from "@/components/styleguideForms/Colors";
import FileUpload from "@/components/input/fileUpload";
import TextureUpload from "@/components/input/TextureUpload";
import BasicCard from "@/components/cards/BasicCard";
/**
 * Collection Seite der Anwendung.
 * Diese Seite ist eine Public Seite die nur für die Entwicklung gedacht ist.
 * Diese Seite ist nicht für den produktiven Einsatz gedacht.
 * Sie dieht eine Sammlung von verschiedenen UI-Elementen und deren Darstellung.
 * Die Sprache wird über den URL-Parameter "lang" bestimmt.
 * Die Seite wird server-seitig gerendert und die Daten werden über die Funktion getDictionary geladen.
 */
export default async function CollectionPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  let themes = ["main", "dark", "high-contrast"];

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {JSON.stringify(dict)}
      {themes.map((theme, index) => (
        <div key={theme + "_" + index} className={theme}>
          Color Theme: {theme}
        </div>
      ))}
      <h2 className="font-bold col-span-3">Cards</h2>
      {themes.map((theme, index) => (
        <div className={` ${theme}`} key={"buttons_" + theme + "_" + index}>
          <BasicCard />
        </div>
      ))}
      <h2 className="font-bold col-span-3">Upload File</h2>
      {themes.map((theme, index) => (
        <div className={` ${theme}`} key={"buttons_" + theme + "_" + index}>
          <TextureUpload />
          <FileUpload />
        </div>
      ))}
      <h2 className="font-bold col-span-3">Buttons</h2>
      {themes.map((theme, index) => (
        <div className={`flex ${theme}`} key={"buttons_" + theme + "_" + index}>
          <div className="mx-0.5 my-2">
            <DefaultButton text="Primary" colorClass="btn-primary" />
          </div>
          <div className="mx-0.5 my-2">
            <DefaultButton text="Secondary" colorClass="btn-secondary" />
          </div>
          <div className="mx-0.5 my-2">
            <DefaultButton text="Accent" colorClass="btn-accent" />
          </div>
          <div className="mx-0.5 my-2">
            <DefaultButton text="Neutral" colorClass="btn-neutral" />
          </div>
        </div>
      ))}
      {themes.map((theme, index) => (
        <div className={`flex ${theme}`} key={"buttons_" + theme + "_" + index}>
          <div className="flex justify-between w-full">
            <div className="lableText">Headline</div>
            <InformationTooltip text="some default text for the tooltip" />
          </div>
        </div>
      ))}
    </div>
  );
}
