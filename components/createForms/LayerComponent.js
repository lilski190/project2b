"use client";

import React, { useState } from "react";

const LayerComponent = ({ fieldID, Textvalue, onChange, options }) => {
  const [layer, setLayer] = useState(
    Textvalue
      ? Textvalue
      : ["black", "30", "full", "center", "center", "center", "center", "5"]
  );
  let styleguide = JSON.parse(localStorage.getItem("Styleguide"));

  const extendedColors = {
    ...styleguide[0].colors,
    black: "#000000",
    white: "#FFFFFF",
  };

  const opacities = [100, 80, 60, 40, 20, 0];
  const sizes = [
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ];

  const handleChange = (e) => {
    console.log("handle Cange", e.target.name);
    let lay = [...layer];
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
    } else if (e.target.name == "posYText") {
      lay[5] = e.target.value;
    } else if (e.target.name == "posXText") {
      lay[6] = e.target.value;
    } else if (e.target.name == "textP") {
      lay[7] = e.target.value;
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

  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }

  return (
    <div className="">
      {JSON.stringify(styleguide)}
      <div>
        <div>
          <div>Hintergrundfarbe </div>
          <div className="flex">
            {Object.entries(extendedColors).map(([key, color]) => (
              <div key={key} className="m-2">
                <label className="cursor-pointer">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bg"
                    value={color}
                    className="hidden peer"
                    defaultChecked={color === "#000000"}
                  />
                  <div
                    className="h-7 w-7 rounded-full transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Deckkraft</div>
          <div className="flex">
            {opacities.map((opacity) => (
              <div key={opacity} className="m-2">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="opacity"
                    value={opacity}
                    onChange={handleChange} // deine Funktion
                    className="hidden peer"
                    defaultChecked={opacity === 60}
                  />
                  <div
                    className="border h-7 w-7 rounded-full transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                    style={{
                      backgroundColor:
                        layer[0] + percentToHexAlpha(parseInt(opacity)),
                      border:
                        parseInt(opacity) === 0 ? "2px solid #808080" : "none",
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Größe</div>
          <div className="flex ">
            {sizes.map((size) => (
              <div key={size} className="m-2  h-18 w-8">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    onChange={handleChange} // deine Funktion
                    className="hidden peer"
                    defaultChecked={size === "60%"}
                  />
                  <div
                    className="transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                    style={{
                      backgroundColor: layer[0],
                      height: size,
                      width: size,
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Position Y</div>
          <input
            onChange={handleChange}
            type="radio"
            name="posY"
            className="radio"
            value="flex-start"
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
            value="flex-end"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="posX"
            className="radio"
            value="flex-start"
          />
        </div>
        <div>
          <div>Position X Text</div>
          <input
            onChange={handleChange}
            type="radio"
            name="posXText"
            className="radio"
            value="flex-end"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="posXText"
            className="radio"
            value="flex-start"
          />
        </div>
        <div>
          <div>Position Y Text</div>
          <input
            onChange={handleChange}
            type="radio"
            name="posYText"
            className="radio"
            value="flex-start"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="posYText"
            className="radio"
            value="center"
          />
        </div>
        <div>
          <div>Text Padding</div>
          <input
            onChange={handleChange}
            type="radio"
            name="textP"
            className="radio"
            value="50%"
            defaultChecked
          />
          <input
            onChange={handleChange}
            type="radio"
            name="textP"
            className="radio"
            value="10%"
          />
        </div>
      </div>
    </div>
  );
};

export default LayerComponent;
