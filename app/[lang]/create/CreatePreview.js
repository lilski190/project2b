"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import ImageWithText from "@/components/templates/ImageWithText";
import ImageGallery from "@/components/templates/ImageGallery";
import GraphicWithText from "@/components/templates/GraphicWithText";

/**
 * `CreatePreview` ist eine Client-Komponente, die eine Live-Vorschau des aktuell bearbeiteten Contents rendert.
 *
 * Die Vorschau basiert auf dem im LocalStorage gespeicherten Formularzustand (`CreateForm`),
 * der aus der Content-Erstellung stammt. Bei jeder Änderung am Formular (über das Event `"createform-updated"`)
 * wird die Vorschau automatisch aktualisiert.
 *
 * Die Auswahl des anzuzeigenden Template-Typs (`template`) bestimmt, welche Unterkomponente zur Darstellung verwendet wird:
 * - `"text_with_graphic"` → `GraphicWithText`
 * - `"text_with_image"` → `ImageWithText`
 * - `"image_gallery"` → `ImageGallery`
 *
 * Nicht unterstützte Templates führen zu einer Fehlermeldung.
 *
 * @component
 * @client
 * @param {Object} props - Eigenschaften der Vorschaukomponente
 * @param {Object} props.dict - Sprachabhängiges Übersetzungsobjekt
 * @param {Object} props.data - Optionen oder Metadaten für das ausgewählte Template
 * @param {string} props.template - Der gewählte Template-Typ (z. B. `"text_with_image"`)
 *
 * @returns {JSX.Element} Die gerenderte Template-Vorschau oder eine Fehlermeldung
 */
export default function CreatePreview({ dict, data, template }) {
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("CreateForm"));
      setPreviewData(updated);
    };

    window.addEventListener("createform-updated", handleUpdate);
    handleUpdate();

    return () => {
      window.removeEventListener("createform-updated", handleUpdate);
    };
  }, []);

  const normalizedTemplate = template?.toLowerCase();

  let TemplateComponent = null;

  if (normalizedTemplate === "text_with_graphic") {
    TemplateComponent = (
      <GraphicWithText previewData={previewData} options={data} />
    );
  } else if (normalizedTemplate === "text_with_image") {
    TemplateComponent = (
      <ImageWithText previewData={previewData} options={data} />
    );
  } else if (normalizedTemplate === "image_gallery") {
    TemplateComponent = (
      <ImageGallery previewData={previewData} options={data} />
    );
  } else {
    TemplateComponent = (
      <div className="text-error">
        {dict.gerenall.notImplemented} {template}
      </div>
    );
  }

  return (
    <div className="h-auto">
      <div className="z-10">{TemplateComponent}</div>
    </div>
  );
}
