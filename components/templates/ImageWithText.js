"use client";
import { useState } from "react";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ImageWithText({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]); // Erstes Tab aktiv

  let imgURL;
  let text;
  let description;
  let logo;
  let layer;
  let layerData;
  let textLayer;
  let logoStyle = {};
  let logoPosition;
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
      (item) => item.type === "layer" && item.id === "bgLayer"
    )?.value;
    textLayer = previewData?.types?.find(
      (item) => item.type === "layer" && item.id === "textLayer"
    )?.value;
    logoStyle = previewData?.types?.find((item) => item.type === "logo")?.value;
  }

  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }
  //layerData = ["black", "30", "full", "end", "left"];

  const getSafeColor = (color) => {
    if (typeof color !== "string") return "#000";

    // Prüfen, ob die Farbe im oklch-Format ist
    if (color.trim().startsWith("oklch")) {
      console.warn("Unsupported color format, replacing:", color);
      return "#000"; // Oder ein passender Ersatzwert
    }

    return color;
  };

  if (layerData != undefined) {
    console.log("Layers", layerData[4]);
    // const [justify, align] = layerData[4].split(",");
    console.log("align", layerData[4][1], "justify", layerData[4][0]);
    // layer = `bg-${layerData[0]}/${Number(layerData[1])} h-30 w-30`;
    // layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]}`;
    layer = {
      backgroundColor: "#202020", // getSafeColor(
      //   layerData[0] + percentToHexAlpha(parseInt(layerData[1]))
      // ),
      // opacity: Number(layerData[1]) / 100,
      height: layerData[2], // h-30 ≈ 30 * 0.25rem
      width: layerData[3], // w-30
      color: "#FFFFFF",
      fontSize: "1.5rem", // text-2xl
      fontWeight: "bold",
      position: "absolute",
      display: "flex",
      //   Child alligment:
      alignItems: textLayer[1][1],
      justifyContent: textLayer[1][0],
    };
    layerPosition = {
      position: "absolute",
      inset: 0, // shorthand for top/right/bottom/left = 0
      display: "flex",
      alignItems: layerData[4][1],
      justifyContent: layerData[4][0],
    };
    textPosition = {
      color: "#808080", //getSafeColor(textLayer[0]),
      width: textLayer[2],
      textAlign: textLayer[3],
    };
    logoPosition = {
      position: "absolute",
      inset: 0, // shorthand for top/right/bottom/left = 0
      display: "flex",
      alignItems: logoStyle[3][1],
      justifyContent: logoStyle[3][0],
    };
  }
  //layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]} bg-primary`;

  const handleExport = async () => {
    console.log("export tirggeded for: ", activeTab);
    const element = document.getElementById("export");
    const width = options[activeTab].width;
    const height = options[activeTab].height;

    if (!element) return;

    replaceOklchColors(document.getElementById("export"));
    const canvas = await html2canvas(element, {
      backgroundColor: "rgb(255, 255, 255)",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    if (activeTab === "web") {
      // HTML Export: evtl. statisch per Download

      const htmlContent = element.outerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "export.html";
      link.click();
    } else if (activeTab === "instagram") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "instagram-post.png"; // JPG wäre kleiner, PNG hat bessere Qualität
      link.click();
    } else if (activeTab === "Presentation" || activeTab === "DINA6") {
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${activeTab}.pdf`);
    }
  };

  function replaceOklchColors(root = document.body) {
    console.log("called replace colors");
    const elements = root.querySelectorAll("*");

    elements.forEach((el) => {
      const styles = window.getComputedStyle(el);
      const styleProps = ["color", "backgroundColor", "borderColor"];

      styleProps.forEach((prop) => {
        const value = styles.getPropertyValue(prop);

        if (value.includes("oklch")) {
          console.warn(`Replacing ${prop} from`, value);
          // Beispiel: Ersetze mit neutralem RGB-Wert
          el.style[prop] = "rgb(0, 0, 0)";
        }
      });
    });
  }

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
      <div className="w-full aspect-square">
        <div
          className="bg-black"
          style={{
            width: `${options[activeTab].widthPercent}%`,
            height: `${options[activeTab].heightPercent}%`,
          }}
        >
          <div
            id="export"
            style={{
              all: "unset", // <- setzt ALLE Styles zurück (verhindert Vererbung)
              fontFamily: "inherit", // falls du Fonts trotzdem beibehalten willst
            }}
          >
            <div className="relative w-full h-full">
              {imgURL && (
                <img
                  src={imgURL}
                  alt="Content uploaded"
                  className="w-full h-full object-cover"
                />
              )}
              <div style={layerPosition}>
                <div style={layer}>
                  <div style={textPosition} className="p-3 ">
                    {text && <div> {text}</div>}
                  </div>
                </div>
              </div>

              <div style={logoPosition}>
                <div className="p-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {description && <div> {description}</div>}

      <button className="btn btn-primary" onClick={handleExport}>
        EXPORT
      </button>
      {JSON.stringify(logoStyle)}
    </div>
  );
}
