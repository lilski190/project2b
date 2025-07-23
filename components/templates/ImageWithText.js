/**
 * @file ImageWithText.jsx
 * @description
 * Eine clientseitige React-Komponente zum Rendern eines exportierbaren visuellen Layouts,
 * bestehend aus einem Hintergrundbild, einem Text-Overlay und optional einem Logo.
 * Unterstützt verschiedene Ausgabeformate wie PNG, PDF und HTML für z. B. Instagram, DINA6 oder Web.
 *
 * @module ImageWithText
 */
"use client";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

/**
 * ImageWithText Komponente
 *
 * @param {Object} props - Komponenten-Props
 * @param {Object} props.previewData - Strukturierte Inhalte mit Bild, Text, Logo und Layer-Infos
 * @param {Object} props.options - Exportoptionen, z. B. Maße für Web, Instagram oder PDF
 *
 * @example
 * <ImageWithText previewData={previewData} options={{ web: { width: 800, height: 600 } }} />
 *
 * @returns {JSX.Element} Die exportierbare Bild-Komponente mit Text- und Logolayern
 */
export default function ImageWithText({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]);
  const [localImgUrl, setLocalImgUrl] = useState(null);
  const [localLogoUrl, setLocalLogoUrl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [headfont, setHeadfont] = useState("font-orbitron");

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
  let logoUrl;
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

  /**
   * Lädt ein Bild von einer URL und konvertiert es in eine base64-DataURL.
   *
   * @param {string} url - Die URL des Bildes
   * @returns {Promise<string|null>} DataURL oder null bei Fehler
   */
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
          if (fonts?.heading) {
            setHeadfont(fonts.heading);
          }
        } catch (err) {
          console.error("Fehler beim Parsen von localStorage Styleguide:", err);
        }
      }
    }
  }, [imgURL, logoUrl]);

  /**
   * Konvertiert einen Prozentwert (0–100) in einen hexadezimalen Alpha-Wert.
   *
   * @param {number} percent - Prozentwert (Transparenz)
   * @returns {string} Alpha-Wert im HEX-Format (z. B. "FF" für 100 %)
   */
  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }

  if (layerData != undefined) {
    layer = {
      backgroundColor: layerData[0] + percentToHexAlpha(parseInt(layerData[1])),
      height: layerData[2],
      width: layerData[3],

      fontSize: "1.5rem",
      fontWeight: "bold",
      position: "absolute",
      display: "flex",
      alignItems: textLayer[1][1],
      justifyContent: textLayer[1][0],
    };
    layerPosition = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: layerData[4][1],
      justifyContent: layerData[4][0],
    };
    textPosition = {
      color: textLayer[0],
      width: textLayer[2],
      textAlign: textLayer[3],
    };
    logoPosition = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: logoStyle[3][1],
      justifyContent: logoStyle[3][0],
      opacity: parseInt(logoStyle[1], 10) / 100,
    };
    logolayer = {
      width: logoStyle[2],
      aspectRatio: "1 /1",
      position: "absolute",
      display: "flex",
    };
  }
  logoUrl = BASEURL + "styles/" + logoStyle[0];

  if (logoUrl) {
    getImageAsBase64(logoUrl).then((dataUrl) => {
      if (dataUrl) setLocalLogoUrl(dataUrl);
    });
  }

  /**
   * Exportiert den aktuellen Layout-Bereich (`#export`) je nach gewähltem Tab:
   * - Web: als HTML-Datei
   * - Instagram: als PNG
   * - DINA6/Presentation: als PDF
   */
  const handleExport = async () => {
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
      const htmlContent = element.outerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "export.html";
      link.click();
    } else if (activeTab === "instagram") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "instagram-post.png";
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

  /**
   * Ersetzt alle `oklch(...)`-CSS-Farben in einem DOM-Baum mit Fallback-RGB-Werten.
   *
   * @param {HTMLElement} [root=document.body] - Wurzel-Element zum Durchsuchen
   */
  function replaceOklchColors(root = document.body) {
    const elements = root.querySelectorAll("*");

    elements.forEach((el) => {
      const styles = window.getComputedStyle(el);
      const styleProps = ["color", "backgroundColor", "borderColor"];

      styleProps.forEach((prop) => {
        const value = styles.getPropertyValue(prop);

        if (value.includes("oklch")) {
          console.warn(`Replacing ${prop} from`, value);
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
                all: "unset",
                fontFamily: "inherit",
                width: `${options[activeTab].width}px`,
                height: `${options[activeTab].height}px`,
                overflow: "hidden",
              }}
            >
              <div
                className="relative overflow-hidden w-full h-full"
                style={{}}
              >
                {localImgUrl && (
                  <div
                    style={{
                      backgroundImage: `url(${localImgUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  ></div>
                )}
                <div style={layerPosition} className={headfont.font_family}>
                  <div style={layer}>
                    <div style={textPosition} className="p-3 ">
                      {text && <div> {text}</div>}
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
