"use client";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function GraohicWithText({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]); // Erstes Tab aktiv
  const [localImgUrl, setLocalImgUrl] = useState(null);
  const [localLogoUrl, setLocalLogoUrl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [headfont, setHeadfont] = useState("font-orbitron"); // Neuer State für Font-Daten
  const [svgContent, setSvgContent] = useState(null);

  let imgURL;
  let text;
  let description;
  let logo;
  let layer;
  let layerData;
  let textLayer;
  let logoStyle = {};
  let logoPosition;
  let logolayer;
  let layerPosition;
  let textPosition;
  let textSize;
  let logoUrl;
  let backgroundData;
  let bgColor;

  if (previewData?.types) {
    imgURL = previewData?.types?.find((item) => item.type === "image")?.value;
    text = previewData?.types?.find((item) => item.type === "headline")?.value;
    description = previewData?.types?.find(
      (item) => item.type === "text"
    )?.value;
    logo = previewData?.types?.find((item) => item.type === "logo")?.value[0];
    layerData = previewData?.types?.find(
      (item) => item.type === "layer" && item.id === "graficLayer01"
    )?.value;
    textLayer = previewData?.types?.find(
      (item) => item.type === "layer" && item.id === "textLayer"
    )?.value;
    logoStyle = previewData?.types?.find((item) => item.type === "logo")?.value;
    backgroundData = previewData?.types?.find(
      (item) => item.type === "layer" && item.id === "bgLayer"
    )?.value;
  }

  async function getImageAsBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Fehler beim Laden des Bildes als Base64:", err);
      return null;
    }
  }

  useEffect(() => {
    if (imgURL) {
      getImageAsBase64(imgURL).then((dataUrl) => {
        if (dataUrl) setLocalImgUrl(dataUrl);
      });
      if (logoUrl) {
        getImageAsBase64(logoUrl).then((dataUrl) => {
          if (dataUrl) setLocalLogoUrl(dataUrl);
        });
      }

      const styleRaw = localStorage?.getItem("Styleguide");
      if (styleRaw) {
        try {
          const style = JSON.parse(styleRaw);
          const fonts = style[0]?.fonts;
          console.log("fonts", fonts);
          if (fonts?.heading) {
            setHeadfont(fonts.heading);
          }
        } catch (err) {
          console.error("Fehler beim Parsen von localStorage Styleguide:", err);
        }
      }
    }
  }, [imgURL, logoUrl]);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const svgUrl = layerData?.[4];
        if (!svgUrl || !svgUrl.endsWith(".svg")) {
          console.warn("Keine gültige SVG-URL gefunden:", svgUrl);
          return;
        }

        const res = await fetch(svgUrl);
        if (!res.ok) {
          throw new Error(`Fetch-Fehler: ${res.status} ${res.statusText}`);
        }

        const text = await res.text();

        const styledSvg = text
          .replace(
            /fill=".*?"/g,
            `fill="${layerData[0] + percentToHexAlpha(parseInt(layerData[1]))}"`
          )
          .replace(/stroke=".*?"/g, 'stroke="transparent"')
          .replace(/width=".*?"/g, `width="100%"`)
          .replace(/height=".*?"/g, `height="100%"`);

        console.log("styled svg", styledSvg);
        setSvgContent(styledSvg);
      } catch (err) {
        console.error("Fehler beim Laden der SVG:", err);
      }
    };

    fetchSvg();
  }, [layerData]);

  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }
  //layerData = ["black", "30", "full", "end", "left"];

  if (layerData != undefined) {
    console.log("Layers", layerData[4]);
    // const [justify, align] = layerData[4].split(",");
    console.log("align", layerData[4][1], "justify", layerData[4][0]);
    // layer = `bg-${layerData[0]}/${Number(layerData[1])} h-30 w-30`;
    // layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]}`;
    layer = {
      // backgroundColor: layerData[0] + percentToHexAlpha(parseInt(layerData[1])),
      // ),
      // Backgroungopacity: Number(layerData[1]) / 100,
      height: layerData[2], // h-30 ≈ 30 * 0.25rem
      width: layerData[2], // w-30
      margin: "-20% -30% -20% -30%",

      fontSize: "1.5rem", // text-2xl
      fontWeight: "bold",

      display: "flex",
      //   Child alligment:
      alignItems: textLayer[1][1],
      justifyContent: textLayer[1][0],
      position: "relative",
    };

    layerPosition = {
      position: "absolute",
      inset: 0, // shorthand for top/right/bottom/left = 0
      display: "flex",
      alignItems: layerData[3][1],
      justifyContent: layerData[3][0],
    };
  }
  if (backgroundData != undefined) {
    bgColor = {
      backgroundColor: backgroundData[0],
    };
  }
  if (textLayer != undefined && logoStyle != undefined) {
    textPosition = {
      color: textLayer[0],
      width: "100%", //textLayer[2],

      textAlign: textLayer[3],
      position: "absolute", // wichtig!
      top: 0,
      left: 2,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: textLayer[1][1], // z.B. center
      justifyContent: textLayer[1][0], // z.B. center
      padding: "1rem",
      //backgroundColor: "#c62f2f57", // optional: Hintergrundfarbe für den Textbereich
    };
    textSize = {
      margin: "2rem",
      width: textLayer[2],
      fontSize: "1rem",
    };
    logoPosition = {
      position: "absolute",
      inset: 0, // shorthand for top/right/bottom/left = 0
      display: "flex",
      alignItems: logoStyle[3][1],
      justifyContent: logoStyle[3][0],
      opacity: parseInt(logoStyle[1], 10) / 100,
    };
    logolayer = {
      // ),
      // Backgroungopacity: Number(layerData[1]) / 100,
      //height: logoStyle[2], // h-30 ≈ 30 * 0.25rem
      width: logoStyle[2], // w-30
      aspectRatio: "1 /1",
      // backgroundColor: "#909090",
      position: "absolute",
      display: "flex",
    };
  }

  //layerPosition = `inset-0 flex items-${layerData[3]} justify-${layerData[4]} bg-primary`;

  logoUrl = BASEURL + "styles/" + logoStyle[0];

  if (logoUrl) {
    getImageAsBase64(logoUrl).then((dataUrl) => {
      if (dataUrl) setLocalLogoUrl(dataUrl);
    });
  }

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
      console.log("IMG", link.href);
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
    <div
      className={`max-md:collapse max-md:collapse-arrow bg-base-100 border border-base-300 ${
        isCollapsed ? "collapse-open" : ""
      }`}
    >
      {/* Toggle Button nur auf kleinen Screens sichtbar */}
      <div
        className="collapse-title font-semibold cursor-pointer hover:bg-white/10 h-16"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <button
          className="btn btn-primary hover:bg-primary/70 transition-transform duration-300 hover:scale-105 font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handleExport}
        >
          Export: {activeTab}
        </button>
      </div>
      {/* Tabs nur zeigen, wenn nicht collapsed ODER auf großen Screens */}
      <div className={`${isCollapsed ? "hidden" : ""} md:block `}>
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
            className="bg-black "
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
                width: `${options[activeTab].width}px`,
                height: `${options[activeTab].height}px`,
                overflow: "hidden",
                backgroundColor: bgColor
                  ? bgColor.backgroundColor
                  : "transparent",
              }}
            >
              <div
                className="relative overflow-hidden w-full h-full"
                style={bgColor}
              >
                <div style={layerPosition} className={headfont.font_family}>
                  <div style={layer}>
                    {svgContent && parse(svgContent)}
                    <div style={textPosition} className="p-3 ">
                      {text && <div style={textSize}>{text}</div>}
                    </div>
                  </div>
                </div>

                <div style={logoPosition}>
                  <div style={logolayer}>
                    {localLogoUrl && (
                      <div
                        style={{
                          backgroundImage: `url(${localLogoUrl})`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          height: "100%",
                          width: "100%",
                          margin: "2px",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {description && <div> {}</div>}
    </div>
  );
}
