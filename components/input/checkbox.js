"use client";

import React, { useState } from "react";

/**
 * @component Checkbox
 * @description Eine einfache Checkbox-Komponente mit optionalem Initialwert und Change-Callback.
 *
 * @param {Object} props - Komponenteneigenschaften.
 * @param {string} props.fieldID - Name und CSS-Klasse des Input-Felds.
 * @param {string} [props.Textvalue] - Initialwert (nicht direkt für die Checkbox verwendet).
 * @param {Function} [props.onChange] - Callback-Funktion bei Änderung.
 *
 * @returns {JSX.Element} Ein Checkbox-Element.
 */
const Checkbox = ({ fieldID, Textvalue, onChange }) => {
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
        onChange={handleChange}
        type="checkbox"
        defaultChecked
        className={fieldID}
        name={fieldID}
      />
    </div>
  );
};

export default Checkbox;
