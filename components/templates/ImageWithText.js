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

  //layerData = ["black", "30", "full", "end", "left"];

  if (layerData != undefined) {
    layer = `bg-${layerData[0]}/${Number(layerData[1])} h-30 w-30`;
    layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]}`;
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
          <div className={`absolute ${layerPosition}`}>
            <div className={`text-white text-2xl font-bold ${layer}`}>
              {/* <div className="text-center bg-primary">
                {text && <div> {text}</div>}
              </div> */}
            </div>{" "}
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
