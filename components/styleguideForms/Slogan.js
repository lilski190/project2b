import React from "react";
import TextArea from "../input/textArea";

/**
 * Colors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const Slogan = ({ colors, dict }) => {
  return (
    <div className="">
      <TextArea fieldID="slogan" />
    </div>
  );
};

export default Slogan;
