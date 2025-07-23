"use client";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

/**
 * @component GraohicWithText
 * @description Zeigt eine gestaltete Grafik mit Text, Logo, Layern und Exportfunktionen in unterschiedlichen Formaten (z. B. PDF, HTML, PNG).
 * @param {Object} previewData - Strukturierte Eingabedaten mit Typen wie Image, Headline, Text, Logo etc.
 * @param {Object} options - Darstellungseinstellungen für Tabs wie "web", "instagram", "Presentation" etc.
 */
export default function GraohicWithText({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]);
  const [localImgUrl, setLocalImgUrl] = useState(null);
  const [localLogoUrl, setLocalLogoUrl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [headfont, setHeadfont] = useState("font-orbitron");
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

  /**
   * Lädt ein Bild von einer URL und wandelt es in einen Base64-Datenstring um.
   * @async
   * @param {string} url - Pfad zur Bilddatei
   * @returns {Promise<string|null>} Base64-Daten-URL oder `null` bei Fehler
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

  /**
   * Lädt Base64-Versionen der Bild- und Logodaten und setzt optional die Schriftart aus dem LocalStorage.
   */
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
   * Holt ein SVG-Overlay (Layer) aus einer URL und passt es dynamisch mit Farbe und Transparenz an.
   * Nur wenn gültige SVG-URL vorhanden ist.
   */
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
        setSvgContent(styledSvg);
      } catch (err) {
        console.error("Fehler beim Laden der SVG:", err);
      }
    };

    fetchSvg();
  }, [layerData]);

  /**
   * Konvertiert einen Prozentwert (0–100) in einen 2-stelligen HEX-Alpha-Kanal-Wert.
   * @param {number} percent - Prozentwert der Transparenz
   * @returns {string} HEX-Wert (z. B. "80" für 50%)
   */
  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }

  if (layerData != undefined) {
    layer = {
      height: layerData[2],
      width: layerData[2],
      margin: "-20% -30% -20% -30%",
      fontSize: "1.5rem",
      fontWeight: "bold",
      display: "flex",
      alignItems: textLayer[1][1],
      justifyContent: textLayer[1][0],
      position: "relative",
    };

    layerPosition = {
      position: "absolute",
      inset: 0,
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
      width: "100%",
      textAlign: textLayer[3],
      position: "absolute",
      top: 0,
      left: 2,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: textLayer[1][1],
      justifyContent: textLayer[1][0],
      padding: "1rem",
    };
    textSize = {
      margin: "2rem",
      width: textLayer[2],
      fontSize: "1rem",
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
   * Exportiert das aktuell sichtbare Element in PDF, HTML oder PNG je nach aktivem Tab.
   * Verwendet html2canvas & jsPDF für Screenshot- und PDF-Generierung.
   * @async
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
   * Ersetzt CSS-Farben im OKLCH-Format in einem DOM-Baum durch RGB-Werte.
   * Workaround für Inkompatibilitäten bei Export-Tools (z. B. html2canvas).
   * @param {HTMLElement} [root=document.body] - Ausgangs-DOM-Element für das Scannen
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
