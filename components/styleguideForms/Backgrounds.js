import React from "react";
import TextureUpload from "../input/TextureUpload";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Backgrounds = ({ backgrounds, dict, folderID }) => {
  let baseUrl =
    "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/styles/";

  return (
    <div className="grid grid-cols-2  gap-4">
      <div className="flex flex-col items-center  mt-2 justify-self-end">
        <div className="flex items-center">
          <div className="flex justify-between w-full py-2">
            <TextureUpload
              fieldID="light_01"
              url={backgrounds.light_01}
              BASEURL={baseUrl}
              folderID={folderID}
            />
          </div>
          <div className="flex justify-between w-full p-2">
            <TextureUpload
              fieldID="light_02"
              url={backgrounds.light_02}
              BASEURL={baseUrl}
              folderID={folderID}
            />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.main} Text-TODO</div>
      </div>
      <div className="flex flex-col items-center mt-2 justify-self-start">
        <div className="flex items-center">
          <div className="flex justify-between w-full p-2">
            <TextureUpload
              fieldID="dark_01"
              url={backgrounds.dark_01}
              BASEURL={baseUrl}
              folderID={folderID}
            />
          </div>
          <div className="flex justify-between w-full py-2">
            <TextureUpload
              fieldID="dark_02"
              url={backgrounds.dark_02}
              BASEURL={baseUrl}
              folderID={folderID}
            />
          </div>
        </div>
        <div className="lableTextSmall text-center">
          {dict.detail} Text-Todo
        </div>
      </div>
    </div>
  );
};

export default Backgrounds;
