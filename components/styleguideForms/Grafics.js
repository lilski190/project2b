import React from "react";
import TextureUpload from "../input/TextureUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
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
