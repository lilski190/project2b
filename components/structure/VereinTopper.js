"use client";
import { useEffect, useState } from "react";
import { BASEURL } from "@/lib/globals";

/**
 * VereinTopper Komponent
 *
 * Zeigt eine stilisierte Kopfzeile (Banner) mit Vereins- und Mitgliedsinformationen an.
 * Das Design passt sich dynamisch an, basierend auf einem Styleguide-Objekt aus dem lokalen Speicher.
 * Wird kein Styleguide gefunden, wird ein Standard-Layout mit übergebenen Props verwendet.
 *
 * @param {Object} props
 * @param {string} props.memberName - Name des Mitglieds, das angezeigt wird.
 * @param {string} props.vereinName - Name des Vereins, der angezeigt wird.
 * @param {string} props.vereinText - Text vor dem Vereinsnamen (z.B. "Willkommen bei").
 * @param {string} props.memberText - Text vor dem Mitgliedsnamen (z.B. "Mitglied:").
 * @param {string} props.bgColor - Hintergrundfarbe für den SVG-Farbverlauf.
 *
 * @returns {JSX.Element} JSX-Element mit der stilisierten Kopfzeile.
 */
export default function VereinTopper({
  memberName,
  vereinName,
  vereinText,
  memberText,
  bgColor,
}) {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const savedStyle = localStorage.getItem("Styleguide");
    if (savedStyle) {
      try {
        const parsed = JSON.parse(savedStyle);
        setStyle(parsed);
      } catch (e) {
        console.error("Fehler beim Parsen von Styleguide:", e);
      }
    }
  }, []);

  if (!style) {
    return (
      <div className="relative bg-primary text-primary-content px-6 py-13  w-full overflow-hidden h-96">
        <div className="flex justify-between">
          <div className="w-full ">
            <div className={` headline w-3/4`}>
              {vereinText} {vereinName}
            </div>
            <div className={`title mt-3`}>
              {memberText} {memberName}
            </div>
          </div>
          <div className="w-36 aspect-square rounded-full"></div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-auto z-0 -mt-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={bgColor}
            fillOpacity="1"
            d="M0,224L60,197.3C120,171,240,117,360,122.7C480,128,600,192,720,192C840,192,960,128,1080,96C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div
      className="relative text-primary-content px-6 py-13  w-full overflow-hidden "
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${
          style[0]?.colors?.main_01 || "gray"
        }, ${style[0]?.colors?.main_02 || "darkgray"})`,
        color: style[0]?.colors?.text_01 || "white",
      }}
    >
      <div className="flex justify-between h-96">
        <div className="w-full ">
          <div
            className={`${style[0]?.fonts.heading.font_family} headline w-3/4`}
            style={{ color: style[0]?.colors?.text_01 || "white" }}
          >
            {vereinText} {vereinName}
          </div>
          <div
            className={`${style[0]?.fonts.body.font_family} title mt-3`}
            style={{ color: style[0]?.colors?.text_01 || "white" }}
          >
            {memberText} {memberName}
          </div>
        </div>

        <div className="h-36 w-auto relative max-md:h-24">
          <img
            src={BASEURL + "styles/" + style[0]?.logo.big}
            alt="Verein Logo"
            className="h-36 w-auto max-md:h-24"
          />
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-0 -mt-24 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={bgColor}
          fillOpacity="1"
          d="M0,224L60,197.3C120,171,240,117,360,122.7C480,128,600,192,720,192C840,192,960,128,1080,96C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
