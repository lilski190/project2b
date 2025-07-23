"use client";

import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import Colors from "@/components/styleguideForms/Colors";
import Backgrounds from "@/components/styleguideForms/Backgrounds";
import FontSelectors from "@/components/styleguideForms/FontSelectors";
import Logos from "@/components/styleguideForms/Logos";
import Slogan from "@/components/styleguideForms/Slogan";
import Grafics from "@/components/styleguideForms/Grafics";
import Link from "next/link";

/**
 * StyleguideForm Komponente
 *
 * Dieses Formular ermöglicht es dem Benutzer, den Vereins-Styleguide anzupassen.
 * Der Styleguide umfasst folgende Bereiche:
 * - Farben
 * - Hintergründe (als Bild)
 * - Logos (als Bild)
 * - Schriftarten
 * - Slogan
 * - Grafiken
 *
 * Jeder Bereich ist in einer eigenen Unterkomponente gekapselt, die eine Überschrift
 * und einen Infotext (Tooltip) enthält, um den Benutzer bei der Eingabe zu unterstützen.
 *
 * Beim Absenden des Formulars werden die eingegebenen Daten an die `saveStyleguideAction`
 * übergeben, welche die Daten speichert.
 *
 * Während der Speicherung wird ein Ladezustand angezeigt, und der Benutzer erhält über
 * `react-hot-toast` eine Erfolg- oder Fehlermeldung.
 *
 * @param {Object} props - Eigenschaften des Components
 * @param {Object} props.dict - Sprachabhängige Texte und Labels (Dictionary)
 * @param {string} props.data - JSON-stringifizierte Daten des Styleguides
 * @param {string} props.folderID - Identifier für den Vereinsordner, wird an einige Unterkomponenten weitergegeben
 * @param {string} props.lang - Aktuelle Sprache (z. B. "de", "en")
 *
 * @returns {JSX.Element} Das gerenderte Formular zur Styleguide-Bearbeitung
 */
export default function StyleguideForm({ dict, data, folderID, lang }) {
  const [loading, setLoading] = useState(false);
  let parsedDataObj = JSON.parse(data);
  let parsedData = parsedDataObj[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const result = await saveStyleguideAction(formData);
      localStorage.setItem("Styleguide", JSON.stringify(result));

      if (result.data) {
        toast.success("Styleguide erfolgreich gespeichert!");
      } else {
        toast.error("Fehler beim Speichern");
      }
    } catch (error) {
      console.error("Fehler beim Submit:", error);
      toast.error("Unerwarteter Fehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-6">
      <div className="fixed p-3 pr-4 top-0 right-0 z-30">
        <button
          type="submit"
          className="btn btn-primary hover:bg-primary/70 transition-transform duration-300 hover:scale-105 font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          {dict.styleguide.save}
        </button>
      </div>
      <Toaster position="top-center" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <div className="col-span-1  pl-6  pr-3 py-6 max-md:pl-3 max-md:pb-0 max-md:pt-3">
          <p className="headline ">{dict.styleguide.title}</p>
          <p className="baseText mt-3">{dict.styleguide.description}</p>

          <div className="flex justify-between w-full mt-3 ">
            <div className="lableText">{dict.styleguide.headlines.colors}</div>
            <InformationTooltip text={dict.styleguide.infotext.colors} />
          </div>
          <Colors
            colors={parsedData.colors}
            dict={dict.styleguide.colorDescription}
          />

          <div className="flex justify-between w-full mt-3">
            <div className="lableText">
              {dict.styleguide.headlines.backgrounds}
            </div>
            <InformationTooltip text={dict.styleguide.infotext.backgrounds} />
          </div>
          <Backgrounds
            dict={dict.styleguide.backgroundDescription}
            backgrounds={parsedData.backgrounds}
            folderID={folderID} // Pass the folderID prop
          />
        </div>
        <div className="col-span-1  pr-6  pl-3 py-6 max-md:pr-3 max-md:pt-0">
          <div className="flex justify-between w-full mt-3">
            <div className="lableText">{dict.styleguide.headlines.logo}</div>
            <InformationTooltip text={dict.styleguide.infotext.logo} />
          </div>
          <Logos
            dict={dict.styleguide.logoDescription}
            folderID={folderID}
            logo={parsedData.logo}
          />

          <div className="flex justify-between w-full mt-3">
            <div className="lableText">{dict.styleguide.headlines.fonts}</div>
            <InformationTooltip text={dict.styleguide.infotext.fonts} />
          </div>
          <FontSelectors
            fonts={parsedData.fonts}
            dict={dict.styleguide.fontsDescription}
          />

          <div className="flex justify-between w-full mt-3 mb-1.5">
            <div className="lableText">{dict.styleguide.headlines.slogan}</div>
            <InformationTooltip text={dict.styleguide.infotext.slogan} />
          </div>
          <Slogan text={parsedData.slogan} />

          <div className="flex justify-between w-full mt-3">
            <div className="lableText">{dict.styleguide.headlines.grafics}</div>
            <InformationTooltip text={dict.styleguide.infotext.grafics} />
          </div>
          <Grafics
            dict={dict.styleguide.graficsDescription}
            grafics={parsedData.grafics}
            folderID={folderID}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-1 px-6">
        <Link href={`/${lang}/dashboard`} className="w-full">
          <button className="w-full btn btn-soft btn-warning hover:bg-warning/70 transition-transform duration-300 font-semibold py-2 px-4 rounded-lg shadow-md">
            {dict.styleguide.cancel}
          </button>
        </Link>
        <button
          type="submit"
          className="w-full btn btn-primary hover:bg-primary/70 transition-transform duration-300 hover:scale-105 font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          {dict.styleguide.save}
        </button>
      </div>
    </form>
  );
}
