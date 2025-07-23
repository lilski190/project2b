import React from "react";
import TextureUpload from "../input/TextureUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Grafics Component
 *
 * Dieses Component zeigt versteckte Upload-Felder für Grafiken und Formen.
 * Es sind zwei Bereiche vorhanden: "Formen" und "Grafiken",
 * jeweils mit 4 Upload-Feldern für Texturen.
 *
 * @param {Object} props - Die Eigenschaften des Components.
 * @param {Object} props.grafics - Objekt mit URLs der Grafiken und Formen.
 * @param {string} props.grafics.form_01 - URL der ersten Form-Textur.
 * @param {string} props.grafics.form_02 - URL der zweiten Form-Textur.
 * @param {string} props.grafics.form_03 - URL der dritten Form-Textur.
 * @param {string} props.grafics.form_04 - URL der vierten Form-Textur.
 * @param {string} props.grafics.grafik_01 - URL der ersten Grafik-Textur.
 * @param {string} props.grafics.grafik_02 - URL der zweiten Grafik-Textur.
 * @param {string} props.grafics.grafik_03 - URL der dritten Grafik-Textur.
 * @param {string} props.grafics.grafik_04 - URL der vierten Grafik-Textur.
 * @param {Object} props.dict - Wörterbuch mit Texten und Alternativtexten für die UI.
 * @param {Object} props.dict.graficsUpload - Texte und Konfigurationen für das TextureUpload-Component.
 * @param {string[]} props.dict.imgAlt - Array mit Alternativtexten für die Upload-Bilder (mind. 8 Einträge).
 * @param {string} props.dict.form - Bezeichnung für den Formen-Bereich.
 * @param {string} props.dict.grafic - Bezeichnung für den Grafiken-Bereich.
 * @param {string} props.folderID - ID des Ordners, in dem die Dateien gespeichert werden.
 *
 * @returns {JSX.Element} Das gerenderte Grafics Component.
 */
const Grafics = ({ grafics, dict, folderID }) => {
  return (
    <div className="pb-2 pt-3 bg-neutral/30 rounded-md mt-1 ">
      <div className="lableTextSmall my-1 pb-2 pl-2">{dict.form}</div>
      <div className="grid grid-cols-2 gap-4 px-2 lg:grid-cols-4">
        <div className="px-1.5">
          <TextureUpload
            fieldID="form_01"
            url={grafics.form_01}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[0]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="form_02"
            url={grafics.form_02}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[1]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="form_03"
            url={grafics.form_03}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[2]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="form_04"
            url={grafics.form_04}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[3]}
          />
        </div>
      </div>

      <div className="lableTextSmall my-1 mt-3 py-2 pl-2">{dict.grafic}</div>
      <div className="grid grid-cols-2 gap-4 px-2 lg:grid-cols-4">
        <div className="px-1.5">
          <TextureUpload
            fieldID="grafik_01"
            url={grafics.grafik_01}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[4]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="grafik_02"
            url={grafics.grafik_02}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[5]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="grafik_03"
            url={grafics.grafik_03}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[6]}
          />
        </div>
        <div className="px-1.5">
          <TextureUpload
            fieldID="grafik_04"
            url={grafics.grafik_04}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.graficsUpload}
            imgAlt={dict.imgAlt[7]}
          />
        </div>
      </div>
    </div>
  );
};

export default Grafics;
