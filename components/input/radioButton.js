"use client";

import React, { useState } from "react";

const RadioButton = ({ fieldID, Textvalue, onChange, options }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  console.log("optons", options);

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
