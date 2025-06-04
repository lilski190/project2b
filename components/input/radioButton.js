"use client";

import React, { useState } from "react";

const RadioButton = ({ fieldID, Textvalue, onChange }) => {
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
        type="radio"
        name={fieldID + "-1"}
        className="radio"
        defaultChecked
      />
      <input
        onChange={handleChange}
        type="radio"
        name={fieldID + "-2"}
        className="radio"
      />
    </div>
  );
};

export default RadioButton;
