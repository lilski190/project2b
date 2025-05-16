"use client";
import { useState } from "react";

const fonts = [
  { name: "Roboto", className: "font-roboto" },
  { name: "Inter", className: "font-inter" },
  { name: "Raleway", className: "font-raleway" },
  { name: "Orbitron", className: "font-orbitron" },
  { name: "Lora", className: "font-lora" },
  { name: "Merriweather", className: "font-merriweather" },
  { name: "Playfair Display", className: "font-playfair" },
  { name: "Alegreya", className: "font-alegreya" },
  { name: "Pacifico", className: "font-pacifico" },
  { name: "Caveat", className: "font-caveat" },
  { name: "Lobster", className: "font-lobster" },
  { name: "Monoton", className: "font-monoton" },
  { name: "Fredericka the Great", className: "font-fredericka" },
  { name: "Bangers", className: "font-bangers" },
  { name: "Source Code Pro", className: "font-sourcecode" },
  { name: "Fira Code", className: "font-firacode" },
  { name: "UnifrakturCook", className: "font-unifraktur" },
  { name: "Dancing Script", className: "font-dancing" },
  { name: "Quicksand", className: "font-quicksand" },
  { name: "Shadows Into Light", className: "font-shadows" },
];

export default function FontSelector({ onChange, fieldID }) {
  const [selected, setSelected] = useState(fonts[0]);

  const handleSelect = (font) => {
    setSelected(font);
    onChange(font.className);
  };

  return (
    <div className="dropdown">
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
