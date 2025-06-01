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
            <FileUpload fieldID="big" bucket="styles" />
            <div className="lableTextSmall text-center">{dict.main}BIG</div>
          </div>
          <div>
            <FileUpload fieldID="small" bucket="styles" />
            <div className="lableTextSmall text-center">{dict.main}SMALL</div>
          </div>
          <div className="">
            <FileUpload fieldID="one_color" bucket="styles" />
            <div className="lableTextSmall text-center">
              {dict.main}ONE_COLOR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
