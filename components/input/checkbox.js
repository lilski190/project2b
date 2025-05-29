"use client";

import React, { useState } from "react";

const Checkbox = ({ fieldID, Textvalue }) => {
  const [text, setText] = useState(Textvalue ? Textvalue : "");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="">
      <input
        onChange={handleChange}
        type="checkbox"
        defaultChecked
        className="checkbox"
      />
    </div>
  );
};

export default Checkbox;
