"use client";

import React, { useState } from "react";

const Checkbox = ({ fieldID, Textvalue, onChange }) => {
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
        type="checkbox"
        defaultChecked
        className={fieldID}
        name={fieldID}
      />
    </div>
  );
};

export default Checkbox;
