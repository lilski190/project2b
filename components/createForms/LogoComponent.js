"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";

const LogoComponent = ({ fieldID, Textvalue, onChange, options }) => {
  const [layer, setLayer] = useState(Textvalue ? Textvalue : options);
  let styleguide = JSON.parse(localStorage.getItem("Styleguide"));

  let logos = styleguide.data.logo;

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
      {JSON.stringify(Textvalue)}
      LOGOS: {JSON.stringify(logos)}
      {options.map((option, index) => {
        switch (option) {
          case "bg":
            return (
              <div key={option} className="py-1.5 w-5/6">
                <div>Hintergrundfarbe </div>
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
                              "#FFFFFF" + percentToHexAlpha(parseInt(opacity)),
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
                  <div>Größe</div>
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
                            className="w-3 bg-white/30 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                            style={{
                              height: size,
                            }}
                          ></div>
                        </label>
                      </div>
                    ))}
                  </div>
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
                          <div className="bg-white/30 h-7 w-16 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          case "logo":
            return (
              <div key={option}>
                <div className="">
                  <div>Logos</div>
                  {JSON.stringify(logos)}
                  <div className="flex">
                    {Object.entries(logos).map(([key, logo]) => (
                      <div key={logo} className="m-2">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            name={"logo" + fieldID}
                            value={logo}
                            onChange={(e) => handleChange(e, index, "logo")}
                            className="hidden peer"
                          />
                          <div className="bg-white/20 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info">
                            <div className="w-full">
                              <Image
                                src={BASEURL + "styles/" + logo}
                                width={30}
                                height={20}
                                alt="logo"
                                className=" h-16 w-16"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                    <div className="m-2">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={"logo" + fieldID}
                          value="none"
                          onChange={(e) => handleChange(e, index, "logo")}
                          className="hidden peer"
                          defaultChecked
                        />
                        <div className="bg-white/20 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info">
                          <div className="w-full h-16 w-20">NONE</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default LogoComponent;
