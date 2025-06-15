import React from "react";
import FileUpload from "../input/fileUpload";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Logos = ({ colors, dict, folderID, logo }) => {
  let baseUrl =
    "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/";
  return (
    <div className="">
      LOGO: {JSON.stringify(logo)}
      {folderID}
      <div className="flex flex-col items-center  mt-2 justify-self-end">
        <div className="flex items-center">
          <div className="">
            <FileUpload
              fieldID="logo_big"
              bucket="styles"
              BASEURL={baseUrl}
              folderID={folderID}
              url={
                logo?.big
                  ? baseUrl + logo.big
                  : "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
              }
              // onChange={(newValue) => handleChange(index, newValue)}
            />
            <div className="lableTextSmall text-center">{dict.main}BIG</div>
          </div>
          <div>
            <FileUpload
              fieldID="logo_small"
              bucket="styles"
              BASEURL={baseUrl}
              folderID={folderID}
              url={
                logo?.small
                  ? baseUrl + logo.small
                  : "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
              }
              //   onChange={(newValue) => handleChange(index, newValue)}
            />
            <div className="lableTextSmall text-center">{dict.main}SMALL</div>
          </div>
          <div className="">
            <FileUpload
              fieldID="logo_one_color"
              bucket="styles"
              BASEURL={baseUrl}
              folderID={folderID}
              url={
                logo?.one_color
                  ? baseUrl + logo.one_color
                  : "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/basic/illustration/FileUpload.jpg"
              }
              //  onChange={(newValue) => handleChange(index, newValue)}
            />
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
