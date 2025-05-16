"use client";
import React from "react";
import { useState } from "react";
import FontSelector from "../input/fontSelector";

/**
 * FontSelectors Komponent
 * Hier kommen versteckte inputfields für die Farben rein
 */
const FontSelectors = ({ dict }) => {
  const [fontClassHeadline, setFontClassHeadline] = useState("font-roboto");
  const [fontClassText, setFontClassText] = useState("font-roboto");
  return (
    <div className="grid grid-cols-2  gap-4">
      <div className="p-6">
        <FontSelector
          onChange={(font) => setFontClassHeadline(font)}
          fieldID=""
        />
        <p className={`mt-6 headline ${fontClassHeadline}`}>
          Dies ist ein Vorschautext in der ausgewählten Schriftart.
        </p>
      </div>
      <div className="p-6">
        <FontSelector onChange={(font) => setFontClassText(font)} />
        <p className={`mt-6 baseText ${fontClassText}`}>
          Dies ist ein Vorschautext in der ausgewählten Schriftart.
        </p>
      </div>
    </div>
  );
};

export default FontSelectors;
