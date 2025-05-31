"use client";
import React from "react";
import { useState } from "react";
import FontSelector from "../input/fontSelector";

/**
 * FontSelectors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const FontSelectors = ({ dict, fonts }) => {
  const [fontClassHeadline, setFontClassHeadline] = useState(
    fonts.heading.font_family
  );
  const [fontClassText, setFontClassText] = useState(fonts.body.font_family);
  return (
    <div className="grid grid-cols-2  gap-4">
      <div className="p-6">
        <FontSelector
          onChange={(font) => setFontClassHeadline(font)}
          fieldID="headline_family"
          defaultFont={fonts.heading.font_family}
        />
        <p className={`mt-6 headline ${fontClassHeadline}`}>
          Dies ist ein Vorschautext in der ausgewählten Schriftart.
        </p>
      </div>
      <div className="p-6">
        <FontSelector
          onChange={(font) => setFontClassText(font)}
          fieldID="text_family"
          defaultFont={fonts.body.font_family}
        />
        <p className={`mt-6 baseText ${fontClassText}`}>
          Dies ist ein Vorschautext in der ausgewählten Schriftart.
        </p>
      </div>
    </div>
  );
};

export default FontSelectors;
