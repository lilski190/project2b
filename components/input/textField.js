"use client";

import React, { useState } from "react";

const TextArea = ({ fieldID, Textvalue }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
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
