import React from "react";
import TextArea from "../input/textArea";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Slogan = ({ colors, dict, text }) => {
  return (
    <div className="">
      <TextArea fieldID="slogan" Textvalue={text} />
    </div>
  );
};

export default Slogan;
