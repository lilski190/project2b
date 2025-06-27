"use client";
import { useState, useEffect } from "react";
import { FONTS, ICONS } from "@/lib/globals";

const fonts = FONTS;
export default function FontSelector({ onChange, fieldID, defaultFont }) {
  const [selected, setSelected] = useState(
    fonts.find((font) => font.className === defaultFont) || fonts[0]
  );

  const handleSelect = (font) => {
    console.log("Selected font:", font);
    setSelected(font);
    onChange(font.className);
  };

  return (
    <div className="dropdown w-full px-2">
      <input
        type="text"
        id={`fontSelector-${fieldID}`}
        name={fieldID}
        value={selected.className}
        readOnly
        className="hidden"
      />
      <div
        tabIndex={0}
        role="button"
        className="btn btn-soft  hover:bg-neutral p-1 w-full flex justify-between"
      >
        <span className={`mx-1 text-left ${selected.className}`}>
          {selected.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={ICONS["chevronDown"]}
          />
        </svg>
      </div>
      <ul className="dropdown-content menu p-2 shadow  rounded-box mr-2 bg-base-200 w-5/6 ">
        <div className="max-h-40  overflow-y-auto">
          {fonts.map((font) => (
            <li key={font.name}>
              <button
                type="button"
                onClick={() => handleSelect(font)}
                className={`${font.name == selected.name ? "bg-info/50" : ""} ${
                  font.className
                }`}
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
