import React from "react";
import TextArea from "../input/textArea";

/**
 * Slogan Component
 *
 * Zeigt ein verstecktes TextArea-Inputfeld für den Slogan an.
 *
 * @param {Object} props - Component Properties
 * @param {Object} props.colors - (Optional) Farben-Objekt (derzeit ungenutzt)
 * @param {Object} props.dict - Wörterbuch mit Texten und Übersetzungen (derzeit ungenutzt)
 * @param {string} props.text - Der aktuelle Textwert für das TextArea-Feld
 *
 * @returns {JSX.Element} Das gerenderte Slogan Component mit TextArea.
 */
const Slogan = ({ colors, dict, text }) => {
  return (
    <div className="">
      <TextArea fieldID="slogan" Textvalue={text} />
    </div>
  );
};

export default Slogan;
