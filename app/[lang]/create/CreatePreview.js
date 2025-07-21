"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import ImageWithText from "@/components/templates/ImageWithText";
import ImageGallery from "@/components/templates/ImageGallery";
import GraphicWithText from "@/components/templates/GraphicWithText";

export default function CreateForm({ dict, data, template }) {
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

  // Optional: Normalize template string
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
        Kein gültiges Template ausgewählt: {template}
      </div>
    );
  }

  return (
    <div className="h-auto">
      <div className="z-10">{TemplateComponent}</div>
    </div>
  );
}
