/**
 * @fileoverview TextLayerComponent ist eine React-Komponente,
 * die die visuelle Gestaltung eines Textelements ermöglicht.
 * Sie erlaubt es Nutzer:innen, Farbe, Breite, Deckkraft und Position des Textes
 * interaktiv über UI-Elemente zu konfigurieren.
 *
 * Die Konfiguration wird über einen `layer`-State als Array verwaltet:
 * - `layer[0]`: Farbe (Hex)
 * - `layer[1]`: Deckkraft (z. B. "60%")
 * - `layer[2]`: Breite (z. B. "60%")
 * - `layer[4]`: Position (Array aus [justifyContent, alignItems])
 *
 * @module TextLayerComponent
 */
"use client";

import React, { useState } from "react";

/**
 * TextLayerComponent
 *
 * @param {Object} props - Props für die Komponente
 * @param {string} props.fieldID - Eindeutige ID, die für Input-Namen verwendet wird (wichtig für Formular-Handling)
 * @param {Array} props.Textvalue - Optionaler Initialwert für das Text-Layer (z. B. ["#000000", "60%", "50%", ["center", "center"]])
 * @param {Function} props.onChange - Callback, der bei Änderungen aufgerufen wird und die neuen Layer-Werte zurückliefert
 * @param {Array<string>} props.options - Wird nicht direkt verwendet, aber zur Konsistenz mit anderen Layer-Komponenten übergeben
 *
 * @returns {JSX.Element} - Eine UI-Komponente zur Anpassung von Textstil-Attributen
 */
const TextLayerComponent = ({ fieldID, Textvalue, onChange, options }) => {
  const [layer, setLayer] = useState(
    Textvalue ? Textvalue : ["black", "60%", ["center", "center"]]
  );
  /**
   * Lese Styleguide aus dem localStorage (keine Errorbehandlung bei ungültigem JSON!)
   * @type {Object}
   */
  let styleguide = JSON.parse(localStorage.getItem("Styleguide"));

  const extendedColors = {
    ...styleguide[0].colors,
    black: "#000000",
    white: "#FFFFFF",
  };

  /**
   * Vordefinierte Breitenwerte
   * @type {Array<string>}
   */
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

  /**
   * Verarbeitet Änderungen an einem der Eingabefelder
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input-Änderungsereignis
   */
  const handleChange = (e) => {
    let lay = [...layer];
    if (e.target.name == "bg") {
      lay[0] = e.target.value;
    } else if (e.target.name == "opacity") {
      lay[1] = e.target.value;
    } else if (e.target.name == "size") {
      lay[2] = e.target.value;
    } else if (e.target.name == "sizeW") {
      lay[3] = e.target.value;
    } else if (e.target.name == "posLayer") {
      const [justify, align] = e.target.value.split(",");
      lay[4] = [justify, align];
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

  return (
    <div className="p-3 bg-white/20">
      <div>
        <div className="py-1.5 w-5/6 ">
          <div>Textfarbe </div>
          <div className="flex flex-wrap w-full">
            {Object.entries(extendedColors).map(([key, color]) => (
              <div key={key} className="m-2">
                <label className="cursor-pointer">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bg"
                    value={color}
                    className="hidden peer"
                    defaultChecked={color === layer[0]}
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
        <div className="flex py-1.5">
          <div className="">
            <div>Breite</div>
            <div className="">
              {sizes.map((size) => (
                <div key={size} className="m-2 h-3 w-18">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="sizeW"
                      value={size}
                      onChange={handleChange} // deine Funktion
                      className="hidden peer"
                      defaultChecked={size === layer[2]}
                    />
                    <div
                      className="transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                      style={{
                        backgroundColor: layer[0],
                        height: "100%",
                        width: size,
                      }}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="w-2/3">
            <div>Position</div>
            <div className="grid grid-cols-3">
              {positions.map((pos) => (
                <div key={pos} className="m-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="posLayer"
                      value={pos}
                      onChange={handleChange} // deine Funktion
                      className="hidden peer"
                      defaultChecked={
                        pos[0] === layer[4][0] && pos[1] === layer[4][1]
                      }
                    />
                    <div
                      style={{
                        backgroundColor: layer[0],
                      }}
                      className="h-7 w-16 transition-all duration-200 hover:scale-110 peer-checked:ring-4 peer-checked:ring-info"
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextLayerComponent;
