import React from "react";
import TextureUpload from "../input/TextureUpload";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Backgrounds = ({ colors, dict }) => {
  return (
    <div className="grid grid-cols-2  gap-4">
      <div className="flex flex-col items-center  mt-2 justify-self-end">
        <div className="flex items-center">
          <div className="flex justify-between w-full py-2">
            <TextureUpload fieldID="main_01" />
          </div>
          <div className="flex justify-between w-full p-2">
            <TextureUpload fieldID="main_02" />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.main}</div>
      </div>
      <div className="flex flex-col items-center mt-2 justify-self-start">
        <div className="flex items-center">
          <div className="flex justify-between w-full p-2">
            <TextureUpload fieldID="detail_01" />
          </div>
          <div className="flex justify-between w-full py-2">
            <TextureUpload fieldID="detail_02" />
          </div>
        </div>
        <div className="lableTextSmall text-center">{dict.detail}</div>
      </div>
    </div>
  );
};

export default Backgrounds;
