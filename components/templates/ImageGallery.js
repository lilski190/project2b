"use client";
import Image from "next/image";
import { BASEURL } from "@/lib/globals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

/**
 * @component ImageGallery
 * @description Erstellt eine dynamische Galerie mit Text, Layern, Logo und Exportfunktionen (PDF, HTML, PNG).
 * @param {Object} previewData - Alle Vorschau-Inhalte, strukturiert nach Typen (z. B. image, gallery, headline, layer etc.)
 * @param {Object} options - Optionen für verschiedene Ausgabeformate/Tabs (z. B. web, instagram, DINA6)
 */
export default function ImageGallery({ previewData, options }) {
  const [activeTab, setActiveTab] = useState(Object.keys(options || {})[0]);
  const [localImgUrl, setLocalImgUrl] = useState(null);
  const [localLogoUrl, setLocalLogoUrl] = useState(null);
  const [localGalleryUrl, setLocalGalleryUrl] = useState([]);
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
  let galleryURLS;

  if (previewData?.types) {
    imgURL = previewData?.types?.find((item) => item.type === "image")?.value;
    galleryURLS = previewData?.types?.find(
      (item) => item.type === "gallery"
    )?.value;
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
   * Wandelt eine Bild-URL in einen Base64-String um.
   * @async
   * @param {string} url - Bild-URL
   * @returns {Promise<string|null>} Base64-String oder `null` bei Fehler
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
   * Lädt Bildquellen (Galerie, Logo, Hauptbild) als Base64 und setzt ggf. Fonts aus localStorage.
   * Wird ausgeführt, wenn Bild- oder Logourl sich ändern.
   */
  useEffect(() => {
    if (logoUrl) {
      getImageAsBase64(logoUrl).then((dataUrl) => {
        if (dataUrl) setLocalImgUrl(dataUrl);
      });
    }
    if (galleryURLS) {
      const fetchImagesSequentially = async () => {
        const results = [];

        for (let i = 0; i < galleryURLS.length; i++) {
          try {
            const base64 = await getImageAsBase64(galleryURLS[i]);
            results.push(base64);
          } catch (err) {
            console.error("Fehler bei Bild:", galleryURLS[i], err);
            results.push(null);
          }
        }

        setLocalGalleryUrl(results);
      };

      fetchImagesSequentially();
    }
    if (logoUrl) {
      getImageAsBase64(logoUrl).then((dataUrl) => {
        if (dataUrl) setLocalLogoUrl(dataUrl);
      });
    }
    if (imgURL) {
      getImageAsBase64(imgURL).then((dataUrl) => {
        if (dataUrl) setLocalImgUrl(dataUrl);
      });

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
  }, [imgURL, logoUrl, galleryURLS]);

  /**
   * Konvertiert einen Prozentwert (0–100) in einen HEX-Wert für Transparenz.
   * @param {number} percent - Transparenz in Prozent
   * @returns {string} 2-stelliger HEX-Alpha-Wert (z. B. "80")
   */
  function percentToHexAlpha(percent) {
    const decimal = Math.round((percent / 100) * 255);
    const hex = decimal.toString(16).padStart(2, "0").toUpperCase();
    return hex;
  }

  if (layerData != undefined) {
    layerPosition = {
      backgroundColor: layerData[0],
    };
  }
  if (textLayer != undefined) {
    textPosition = {
      color: textLayer[0],
      width: textLayer[1],
      textAlign: textLayer[2],
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
      if (dataUrl) setLocalImgUrl(dataUrl);
    });
  }

  /**
   * Exportiert die aktuell gerenderte Galerie je nach aktivem Tab in PDF, PNG oder HTML.
   * Unterstützt: "web", "instagram", "Presentation", "DINA6".
   * Nutzt html2canvas + jsPDF.
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
   * Ersetzt OKLCH-Farben in DOM-Elementen durch RGB-Werte zur Kompatibilität mit Exporttools.
   * @param {HTMLElement} root - Root-Element zum Durchsuchen (default: document.body)
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
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  ...layerPosition,
                }}
              >
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
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      fontFamily: headfont.font_family,
                      width: "100%",
                      height: "33.3333%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    <div style={textPosition}>{text && <div>{text}</div>}</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "0.25rem",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {localGalleryUrl.map((img, i) => (
                    <div
                      key={`gallery_img_${i}`}
                      style={{
                        flex: "0 0 auto",
                        width: "100%",
                        height: "70%",
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ))}
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
