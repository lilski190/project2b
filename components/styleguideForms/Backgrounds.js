import React from "react";
import TextureUpload from "../input/TextureUpload";
import { BASEURL } from "@/lib/globals";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
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
