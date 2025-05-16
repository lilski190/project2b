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
        className="textarea w-2/3"
        placeholder="Slogan"
      ></textarea>
    </div>
  );
};

export default TextArea;
