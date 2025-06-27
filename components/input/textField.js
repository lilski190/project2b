"use client";

import React, { useState } from "react";

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
