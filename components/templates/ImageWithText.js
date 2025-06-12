import { useState } from "react";
import Image from "next/image";

export default function ImageWithText({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]); // Erstes Tab aktiv

  let imgURL;
  let text;
  let description;
  let logo;
  let layer;
  let layerData;
  let logoStyle;
  let layerPosition;
  let textPosition;

  if (previewData?.types) {
    imgURL = previewData?.types?.find((item) => item.type === "image")?.value;
    text = previewData?.types?.find((item) => item.type === "headline")?.value;
    description = previewData?.types?.find(
      (item) => item.type === "text"
    )?.value;
    logo = previewData?.types?.find((item) => item.type === "logo")?.value[0];
    layerData = previewData?.types?.find(
      (item) => item.type === "layer"
    )?.value;
  }

  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }
  //layerData = ["black", "30", "full", "end", "left"];

  if (layerData != undefined) {
    // layer = `bg-${layerData[0]}/${Number(layerData[1])} h-30 w-30`;
    // layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]}`;
    layer = {
      backgroundColor: layerData[0] + percentToHexAlpha(parseInt(layerData[1])),
      // opacity: Number(layerData[1]) / 100,
      height: layerData[2], // h-30 ≈ 30 * 0.25rem
      width: layerData[2], // w-30
      color: "white",
      fontSize: "1.5rem", // text-2xl
      fontWeight: "bold",
      position: "absolute",
      display: "flex",
      alignItems: layerData[5],
      justifyContent: layerData[6],
    };
    layerPosition = {
      position: "absolute",
      inset: 0, // shorthand for top/right/bottom/left = 0
      display: "flex",
      alignItems: layerData[3],
      justifyContent: layerData[4],
    };
    textPosition = {
      padding: `0px ${layerData[7]}`, // z. B. "0px 10px"
    };
  }
  //layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]} bg-primary`;

  return (
    <div className="">
      <div role="tablist" className="tabs tabs-lift w-full flex">
        {Object.entries(options || {}).map(([key, value]) => {
          const isActive = key === activeTab;
          return (
            <div
              role="tab"
              key={key}
              className={`tab flex-1 ${isActive ? "tab-active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {key}
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="relative">
          {imgURL && (
            <Image
              src={imgURL}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          )}
          <div style={layerPosition}>
            <div style={layer}>
              <div style={textPosition}>{text && <div> {text}</div>}</div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end justify-end p-5 ">
            {logo && (
              <div>
                <Image
                  src={logo}
                  width={30}
                  height={20}
                  alt="logo"
                  className="rounded rounded-full h-15 w-15"
                />
              </div>
            )}
          </div>
        </div>
        {description && <div> {description}</div>}
      </div>
      {JSON.stringify(layerData)}
    </div>
  );
}
