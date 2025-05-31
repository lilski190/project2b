"use client";

import React, { useState } from "react";

const ColorPicker = ({ fieldID, ColorValue }) => {
  const [color, setColor] = useState(ColorValue ? ColorValue : "#0080c0");

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="color"
        id={"colorInput" + fieldID}
        value={color}
        onChange={handleChange}
        className="w-15 h-15 rounded-full hover:border-4 hover:border-neutral/20 "
      />

      <input
        type="text"
        value={color}
        id={fieldID}
        placeholder={color}
        name={fieldID}
        onChange={handleChange}
        className={`mt-2 focus:border hover:bg-base-200  input-neutral input  input-ghost input-sm text-center w-20 `}
      />
    </div>
  );
};

export default ColorPicker;
