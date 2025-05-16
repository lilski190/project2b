import React from "react";
import FileUpload from "../input/fileUpload";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Logos = ({ colors, dict }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center  mt-2 justify-self-end">
        <div className="flex items-center">
          <div className="">
            <FileUpload fieldID="main_01" />
            <div className="lableTextSmall text-center">{dict.main}</div>
          </div>
          <div>
            <FileUpload fieldID="main_02" />
            <div className="lableTextSmall text-center">{dict.main}</div>
          </div>
          <div className="">
            <FileUpload fieldID="main_03" />
            <div className="lableTextSmall text-center">{dict.main}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
