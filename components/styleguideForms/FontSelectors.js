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
