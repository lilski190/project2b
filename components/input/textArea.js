"use client";

import React, { useState } from "react";

const TextArea = ({ fieldID, Textvalue }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
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
