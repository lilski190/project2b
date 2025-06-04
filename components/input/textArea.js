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
