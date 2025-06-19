"use client";
import { useState, useEffect } from "react";
import { FONTS } from "@/lib/globals";

const fonts = FONTS;
export default function FontSelector({ onChange, fieldID, defaultFont }) {
  const [selected, setSelected] = useState(
    fonts.find((font) => font.className === defaultFont) || fonts[0]
  );

  const handleSelect = (font) => {
    setSelected(font);
    onChange(font.className);
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        id={`fontSelector-${fieldID}`}
        name={fieldID}
        value={selected.className}
        readOnly
      />
      TODO: Textgröße auswahl mit + - und fontstyle -bold -light ...
      <div tabIndex={0} role="button" className="btn m-1">
        Schriftart:{" "}
        <span className={`ml-2 ${selected.className}`}>{selected.name}</span>
      </div>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box ">
        <div className="max-h-40  overflow-y-auto">
          {fonts.map((font) => (
            <li key={font.name}>
              <button
                onClick={() => handleSelect(font)}
                className={`${
                  font.name == selected.name ? "bg-base-200" : "bg-base-100"
                } ${font.className}`}
              >
                {font.name}
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
