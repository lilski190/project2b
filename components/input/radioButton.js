"use client";

import React, { useState } from "react";

const RadioButton = ({ fieldID, Textvalue }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="">
      <input
        onChange={handleChange}
        type="radio"
        name="radio-1"
        className="radio"
        defaultChecked
      />
      <input
        onChange={handleChange}
        type="radio"
        name="radio-1"
        className="radio"
      />
    </div>
  );
};

export default RadioButton;
