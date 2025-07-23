"use client";
import React from "react";
import { useState } from "react";
import FontSelector from "../input/fontSelector";

/**
 * FontSelectors Component
 *
 * Dieses Component bietet zwei FontSelector Inputs für die Auswahl der Schriftfamilien
 * von Überschriften (headline) und Fließtext (body). Die gewählten Schriftarten werden
 * im State gehalten und als Live-Vorschau angezeigt.
 *
 * @param {Object} props - Die Eigenschaften des Components.
 * @param {Object} props.dict - Ein Wörterbuch mit Texten für die UI.
 * @param {string} props.dict.headline - Bezeichnung für die Überschriften-Font-Auswahl.
 * @param {string} props.dict.body - Bezeichnung für die Fließtext-Font-Auswahl.
 * @param {string} props.dict.preview - Text für die Vorschau.
 * @param {Object} props.fonts - Objekt mit den initialen Fonts.
 * @param {Object} props.fonts.heading - Objekt mit der Schriftart für Überschriften.
 * @param {string} props.fonts.heading.font_family - Name der Schriftfamilie der Überschrift.
 * @param {Object} props.fonts.body - Objekt mit der Schriftart für Fließtext.
 * @param {string} props.fonts.body.font_family - Name der Schriftfamilie des Fließtexts.
 *
 * @returns {JSX.Element} Das gerenderte FontSelectors Component.
 */
const FontSelectors = ({ dict, fonts }) => {
  const [fontClassHeadline, setFontClassHeadline] = useState(
    fonts.heading.font_family
  );
  const [fontClassText, setFontClassText] = useState(fonts.body.font_family);
  return (
    <div className="grid grid-cols-2 gap-4 py-2 bg-neutral/30 rounded-md mt-1 pb-3 ">
      <div className="mt-1">
        <div className="lableTextSmall text-left ml-2 mb-1">
          {dict.headline}
        </div>
        <FontSelector
          onChange={(font) => setFontClassHeadline(font)}
          fieldID="headline_family"
          defaultFont={fonts.heading.font_family}
          dict={dict}
        />
        <p className={`mt-2 mx-3 baseText ${fontClassHeadline}`}>
          {dict.preview}
        </p>
      </div>
      <div className="mt-1">
        <div className="lableTextSmall text-left ml-2 mb-1">{dict.body}</div>
        <FontSelector
          onChange={(font) => setFontClassText(font)}
          fieldID="text_family"
          defaultFont={fonts.body.font_family}
          dict={dict}
        />
        <p className={`mt-2 mx-3 baseText ${fontClassText}`}>{dict.preview}</p>
      </div>
    </div>
  );
};

export default FontSelectors;
