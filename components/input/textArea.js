"use client";

import React, { useState } from "react";

/**
 * TextArea-Komponente mit kontrolliertem Zustand.
 *
 * @param {Object} props
 * @param {string} props.fieldID - ID und Name des Textareas.
 * @param {string} [props.Textvalue] - Initialer Textwert.
 * @param {function(Event): void} [props.onChange] - Callback bei Änderung des Textes.
 *
 * @returns {JSX.Element} Ein mehrzeiliges Texteingabefeld.
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
      <textarea
        value={text}
        onChange={handleChange}
        id={fieldID}
        name={fieldID}
        className="textarea w-full"
        placeholder="Slogan"
      ></textarea>
    </div>
  );
};

export default TextArea;
