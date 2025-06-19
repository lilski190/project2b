"use client";

import React, { useRef, useState } from "react";

const CustomColorPicker = ({ fieldID, ColorValue, onColorChange }) => {
  const [color, setColor] = useState(ColorValue ?? "#0080c0");
  const colorInputRef = useRef(null);

  const handleColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleChange = (e) => {
    setColor(e.target.value);
    if (onColorChange) onColorChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Stylbarer Trigger */}
      <div
        className="w-16 h-16 rounded-full ring-4 ring-neutral/60 cursor-pointer transition-all duration-200 ease-in-out hover:ring-info hover:scale-105 hover:shadow-md"
        style={{ backgroundColor: color }}
        onClick={handleColorClick}
      />

      {/* Unsichtbarer echter Input */}
      <input
        type="color"
        ref={colorInputRef}
        value={color}
        onChange={handleChange}
        className="hidden"
        id={"colorInput" + fieldID}
      />

      {/* Hex-Textfeld */}
      <input
        type="text"
        value={color}
        id={fieldID}
        name={fieldID}
        onChange={handleChange}
        className="text-center input input-ghost h-6 mt-2 cursor-pointer  hover:scale-105 hover:bg-neutral"
      />
    </div>
  );
};

export default CustomColorPicker;
