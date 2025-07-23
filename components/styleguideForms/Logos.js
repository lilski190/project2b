import React from "react";
import FileUpload from "../input/fileUpload";
import LogoUpload from "../input/LogoUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Logos Component
 *
 * Zeigt versteckte Upload-Felder für verschiedene Logo-Varianten.
 * Es gibt Uploads für das große Logo, kleine Logo und ein einfarbiges Logo.
 *
 * @param {Object} props - Component Properties
 * @param {Object} props.dict - Wörterbuch mit Texten und Alternativtexten für die UI.
 * @param {Object} props.dict.logoUpload - Texte und Konfigurationen für das LogoUpload-Component.
 * @param {string[]} props.dict.imgAlt - Array mit Alternativtexten für die Logo-Bilder (mind. 1 Eintrag).
 * @param {string} props.dict.big - Bezeichnung für das große Logo.
 * @param {string} props.dict.small - Bezeichnung für das kleine Logo.
 * @param {string} props.dict.oneColor - Bezeichnung für das einfarbige Logo.
 * @param {string} props.folderID - ID des Ordners, in dem die Logos gespeichert werden.
 * @param {Object} props.logo - Objekt mit den URLs der Logos.
 * @param {string} [props.logo.big] - URL des großen Logos.
 * @param {string} [props.logo.small] - URL des kleinen Logos.
 * @param {string} [props.logo.one_color] - URL des einfarbigen Logos.
 *
 * @returns {JSX.Element} Das gerenderte Logos Component.
 */
const Logos = ({ dict, folderID, logo }) => {
  return (
    <div className="py-2 bg-neutral/30 rounded-md mt-1 px-2">
      <div className="flex items-center justify-evenly  py-2">
        <div className="px-1.5">
          <LogoUpload
            fieldID="logo_big"
            url={logo?.big}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.logoUpload}
            imgAlt={dict.imgAlt[0]}
          />

          <div className="lableTextSmall text-center my-1">{dict.big}</div>
        </div>
        <div className="px-1.5">
          <LogoUpload
            fieldID="logo_small"
            url={logo?.small}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.logoUpload}
            imgAlt={dict.imgAlt[0]}
          />
          <div className="lableTextSmall text-center my-1">{dict.small}</div>
        </div>
        <div className="px-1.5">
          <LogoUpload
            fieldID="logo_one_color"
            url={logo?.one_color}
            BASEURL={BASEURL}
            folderID={folderID}
            bucket={"styles"}
            dict={dict.logoUpload}
            imgAlt={dict.imgAlt[0]}
          />

          <div className="lableTextSmall text-center my-1">{dict.oneColor}</div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
