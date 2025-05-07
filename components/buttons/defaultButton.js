import React from "react";

/**
 * DefaultButton Komponent
 * Dieser Komponent ist ein einfacher Button, der in verschiedenen Themen verwendet werden kann.
 * Es basiert auf dem Tailwind CSS-Framework und Daisy UI für das Styling.
 * Der Button kann mit verschiedenen Text- und Farbklassen angepasst werden.
 * @param {string} text - Der anzuzeigende Text auf dem Button.
 * @param {string} colorClass - Die Farbklasse, die auf den Button angewendet werden soll.
 */
const DefaultButton = ({ text, colorClass }) => {
  return (
    <button className={`btn ${colorClass ? colorClass : "btn-neutral"}`}>
      {text ? text : "Default text"}
    </button>
  );
};

export default DefaultButton;
