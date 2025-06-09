"use client";

import React, { useState } from "react";

const LayerComponent = ({ fieldID, Textvalue, onChange, options }) => {
  const [layer, setLayer] = useState(
    Textvalue ? Textvalue : ["black", "30", "full", "end", "left"]
  );

  const handleChange = (e) => {
    console.log("handle Cange", e.target.name);
    let lay = layer;
    if (e.target.name == "bg") {
      lay[0] = e.target.value;
    } else if (e.target.name == "opacity") {
      lay[1] = e.target.value;
    } else if (e.target.name == "size") {
      lay[2] = e.target.value;
    } else if (e.target.name == "posY") {
      lay[3] = e.target.value;
    } else if (e.target.name == "posX") {
      lay[4] = e.target.value;
    }
    setLayer(lay);
    if (onChange) {
      onChange({
        target: {
          name: fieldID,
          value: lay,
        },
      });
    }
  };

  console.log("optons", options);

  return (
    <div className="">
      {JSON.stringify(options)}
      <div>
        <div>
          <div>Hintergrund</div>
          <input
            onChange={handleChange}
            type="radio"
            name="bg"
            className="radio"
            value="black"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="bg"
            className="radio"
            value="[#238473]"
          />
        </div>
        <div>
          <div>Opacity</div>
          <input
            onChange={handleChange}
            type="radio"
            name="opacity"
            className="radio"
            value="100"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="opacity"
            className="radio"
            value="50"
          />
        </div>
        <div>
          <div>Size</div>
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            className="radio"
            value="full"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="size"
            className="radio"
            value="min"
          />
        </div>
        <div>
          <div>Position Y</div>
          <input
            onChange={handleChange}
            type="radio"
            name="posY"
            className="radio"
            value="top"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="posY"
            className="radio"
            value="center"
          />
        </div>
        <div>
          <div>Position X</div>
          <input
            onChange={handleChange}
            type="radio"
            name="posX"
            className="radio"
            value="end"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="posX"
            className="radio"
            value="start"
          />
        </div>
      </div>
    </div>
  );
};

export default LayerComponent;
