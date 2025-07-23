"use client";

import React, { useState } from "react";

/**
 * TextArea-Komponente (eigtl. TextInput) mit kontrolliertem Zustand.
 *
 * @param {Object} props
 * @param {string} props.fieldID - ID und Name des Input-Felds.
 * @param {string} [props.Textvalue] - Initialer Textwert.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Callback bei Änderung des Textes.
 *
 * @returns {JSX.Element} Ein einzeiliges Texteingabefeld.
 */
const TextArea = ({ fieldID, Textvalue, onChange }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className="">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        id={fieldID}
        className="input w-full"
        placeholder="Slogan"
      ></input>
    </div>
  );
};

export default TextArea;
