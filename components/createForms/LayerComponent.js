"use client";

import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const fallbackStyleguide = [
  {
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
    },
  },
];

const LayerComponent = ({ fieldID, Textvalue, onChange, options }) => {
  const [layer, setLayer] = useState(Textvalue ? Textvalue : options);
  const [styleguide, setStyleguide] = useState(fallbackStyleguide);
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    // Nur im Client verfügbar
    const styleRaw = localStorage?.getItem("Styleguide");
    if (styleRaw) {
      try {
        const parsed = JSON.parse(styleRaw);
        setStyleguide(parsed); // oder ganze Liste, falls du sie brauchst
      } catch (err) {
        console.error("Fehler beim Parsen des Styleguides:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const res = await fetch(layer?.find((l) => l?.includes?.(".svg"))); // oder statisch: fetch('https://...svg')
        const text = await res.text();
        const styledSvg = text
          .replace(
            /fill=".*?"/g,
            `fill=${layer[0] + percentToHexAlpha(parseInt(layer[1]))}`
          )
          .replace(/stroke=".*?"/g, 'stroke="transparent"')
          .replace(/width=".*?"/g, `width=${layer[2] || "100%"}`)
          .replace(/height=".*?"/g, `height=${layer[2] || "100%"}`);
        setSvgContent(styledSvg);
      } catch (err) {
        console.error("Fehler beim Laden der SVG:", err);
      }
    };

    fetchSvg();
  }, [layer]);

  const extendedColors = {
    ...styleguide?.[0]?.colors,
    black: "#000000",
    white: "#FFFFFF",
  };
  console.log("extended colors", extendedColors);

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

  const positions = [
    ["flex-start", "flex-start"],
    ["center", "flex-start"],
    ["flex-end", "flex-start"],
    ["flex-start", "center"],
    ["center", "center"],
    ["flex-end", "center"],
    ["flex-start", "flex-end"],
    ["center", "flex-end"],
    ["flex-end", "flex-end"],
  ];

  const textAligns = ["start", "end", "center", "justify"];

  const handleChange = (e, index, id) => {
    console.log("handle Cange", id);
    let lay = [...layer];
    if (id == "posLayer") {
      console.log("positions", e.target.value);
      const [justify, align] = e.target.value.split(",");
      console.log("jusifys", justify, align);
      lay[index] = [justify, align];
    } else {
      lay[index] = e.target.value;
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
    <div className="p-3">
      {options.map((option, index) => {
        switch (option) {
          case "bg":
            return (
              <div key={option} className="py-1.5 w-5/6">
                <div>Farbe</div>
                <div className="flex flex-wrap w-full">
                  {Object.entries(extendedColors).map(([key, color]) => (
                    <div key={key} className="m-2">
                      <label className="cursor-pointer">
                        <input
                          onChange={(e) => handleChange(e, index, "bg")}
                          type="radio"
                          name={"bg_" + fieldID}
                          value={color}
                          className="hidden peer"
                          defaultChecked={color === layer[index]}
                        />
                        <div
                          className="h-7 w-7 rounded-full transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                          style={{ backgroundColor: color }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "opacity":
            return (
              <div key={option} className="py-1.5">
                <div>Deckkraft</div>
                <div className="flex">
                  {opacities.map((opacity) => (
                    <div key={opacity} className="m-2">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={"opacity_" + fieldID}
                          value={opacity}
                          onChange={(e) => handleChange(e, index, "opacity")}
                          className="hidden peer"
                          defaultChecked={opacity === layer[index]}
                        />
                        <div
                          className="border h-7 w-7 rounded-full transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                          style={{
                            backgroundColor:
                              layer[0] + percentToHexAlpha(parseInt(opacity)),
                            border:
                              parseInt(opacity) === 0
                                ? "2px solid #808080"
                                : "none",
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "size":
            return (
              <div key={option}>
                <div>
                  <div>Höhe</div>
                  <div className="flex">
                    {sizes.map((size) => (
                      <div key={size} className="m-2 h-18 w-3">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            name={"size_" + fieldID}
                            value={size}
                            onChange={(e) => handleChange(e, index, "size")} // deine Funktion
                            className="hidden peer"
                            defaultChecked={size === layer[index]}
                          />
                          <div
                            className="transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                            style={{
                              backgroundColor: layer[0],
                              height: size,
                              width: "100%",
                            }}
                          ></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

          case "sizeW":
            return (
              <div key={option} className="flex py-1.5">
                <div>
                  <div>Breite</div>
                  {sizes.map((size) => (
                    <div key={size} className="m-2 h-3 w-18">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={"sizeW_" + fieldID}
                          value={size}
                          onChange={(e) => handleChange(e, index, "sizeW")}
                          className="hidden peer"
                          defaultChecked={size === layer[index]}
                        />
                        <div
                          className="transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                          style={{
                            backgroundColor: layer[0],
                            height: "100%",
                            width: size,
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "posLayer":
            return (
              <div key={option}>
                <div className="w-2/3">
                  <div>Position</div>
                  <div className="grid grid-cols-3">
                    {positions.map((pos) => (
                      <div key={pos} className="m-2">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            name={"posLayer_" + fieldID}
                            value={pos}
                            onChange={(e) => handleChange(e, index, "posLayer")}
                            className="hidden peer"
                            defaultChecked={
                              pos[0] === layer[index][0] &&
                              pos[1] === layer[index][1]
                            }
                          />
                          <div
                            style={{ backgroundColor: layer[0] }}
                            className="h-7 w-16 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          case "textAlign":
            return (
              <div key={option}>
                <div className="w-2/3">
                  <div>Text Align</div>
                  <div className="flex">
                    {textAligns.map((pos) => (
                      <div key={pos} className="m-2">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            name={"textAlign" + fieldID}
                            value={pos}
                            onChange={(e) =>
                              handleChange(e, index, "textAlign")
                            }
                            className="hidden peer"
                            defaultChecked={pos === layer[index]}
                          />

                          <div className="bg-white/20 p-1 w-16 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info">
                            <div
                              style={{
                                color: layer[0],
                                textAlign: pos,
                              }}
                              className="w-full"
                            >
                              TEXT
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          case "svg":
            return (
              <div key={option} className="py-1.5">
                <div>Form</div>
                <div className="w-48 ">{svgContent && parse(svgContent)}</div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default LayerComponent;
