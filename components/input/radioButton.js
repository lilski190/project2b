"use client";

import React, { useState } from "react";

/**
 * RadioButton-Komponente zum Rendern einer Gruppe von Radio-Buttons.
 *
 * @param {Object} props
 * @param {string} props.fieldID - Name und ID für die Radio-Gruppe.
 * @param {string} [props.Textvalue] - Standardmäßig ausgewählter Wert.
 * @param {function(Event): void} [props.onChange] - Callback bei Änderung der Auswahl.
 * @param {string[]} props.options - Array von Options-Strings für die Radio-Buttons.
 *
 * @returns {JSX.Element} Gruppe von Radio-Buttons mit Labels.
 */
const RadioButton = ({ fieldID, Textvalue, onChange, options }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="">
      <div>
        {options?.map((opt, index) => {
          if (index == 0) {
            return (
              <div key={opt}>
                <label>{opt}</label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name={fieldID}
                  className="radio"
                  defaultChecked
                />
              </div>
            );
          } else {
            return (
              <div key={opt}>
                <label>{opt}</label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name={fieldID}
                  className="radio"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RadioButton;
