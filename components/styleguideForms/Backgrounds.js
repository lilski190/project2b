import React from "react";
import TextureUpload from "../input/TextureUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Backgrounds Component
 *
 * Dieses Component zeigt versteckte Input-Felder für das Hochladen von Hintergrund-Texturen.
 * Es enthält Upload-Felder für helle und dunkle Hintergründe, die in zwei Reihen
 * mit jeweils zwei Textur-Uploads dargestellt werden.
 *
 * @param {Object} props - Die Eigenschaften des Components.
 * @param {Object} props.backgrounds - Ein Objekt mit URLs zu den aktuellen Hintergrund-Texturen.
 * @param {string} props.backgrounds.light_01 - URL der ersten hellen Textur.
 * @param {string} props.backgrounds.light_02 - URL der zweiten hellen Textur.
 * @param {string} props.backgrounds.dark_01 - URL der ersten dunklen Textur.
 * @param {string} props.backgrounds.dark_02 - URL der zweiten dunklen Textur.
 * @param {Object} props.dict - Ein Wörterbuch mit Texten und Alternativtexten für die UI.
 * @param {Object} props.dict.textureUpload - Texte und Konfiguration für das TextureUpload-Component.
 * @param {string[]} props.dict.imgAlt - Array mit Alternativtexten für die Textur-Uploads.
 * @param {string} props.dict.light - Bezeichnung für den hellen Bereich.
 * @param {string} props.dict.dark - Bezeichnung für den dunklen Bereich.
 * @param {string} props.folderID - ID des Ordners, in dem die Texturen gespeichert werden.
 *
 * @returns {JSX.Element} Das gerenderte Backgrounds Component.
 */
const Backgrounds = ({ backgrounds, dict, folderID }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-2 pt-3 bg-neutral/30 rounded-md mt-1 px-2 md:grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-evenly items-end w-full">
          <div className="px-1.5">
            <TextureUpload
              fieldID="light_01"
              url={backgrounds.light_01}
              BASEURL={BASEURL}
              folderID={folderID}
              bucket={"styles"}
              dict={dict.textureUpload}
              imgAlt={dict.imgAlt[0]}
            />
          </div>
          <div className="px-1.5">
            <TextureUpload
              fieldID="light_02"
              url={backgrounds.light_02}
              BASEURL={BASEURL}
              folderID={folderID}
              bucket={"styles"}
              dict={dict.textureUpload}
              imgAlt={dict.imgAlt[1]}
            />
          </div>
        </div>
        <div className="lableTextSmall text-center my-1">{dict.light}</div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-evenly items-end w-full">
          <div className="px-1.5">
            <TextureUpload
              fieldID="dark_01"
              url={backgrounds.dark_01}
              BASEURL={BASEURL}
              folderID={folderID}
              bucket={"styles"}
              dict={dict.textureUpload}
              imgAlt={dict.imgAlt[2]}
            />
          </div>
          <div className="px-1.5">
            <TextureUpload
              fieldID="dark_02"
              url={backgrounds.dark_02}
              BASEURL={BASEURL}
              folderID={folderID}
              bucket={"styles"}
              dict={dict.textureUpload}
              imgAlt={dict.imgAlt[3]}
            />
          </div>
        </div>
        <div className="lableTextSmall text-center my-1">{dict.dark}</div>
      </div>
    </div>
  );
};

export default Backgrounds;
