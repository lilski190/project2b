import React from "react";
import FileUpload from "../input/fileUpload";
import LogoUpload from "../input/LogoUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
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
