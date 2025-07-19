"use client";

import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";
import { useEffect, useState } from "react";
import ImageWithText from "@/components/templates/ImageWithText";

/**
 * Styleguide FORM Komponent
 */
export default function CreateForm({ dict, data }) {
  // let parsedData = JSON.parse(data);
  // console.log("data", parsedData);
  const [previewData, setPreviewData] = useState({});
  useEffect(() => {
    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("CreateForm"));
      setPreviewData(updated);
    };

    // Listener registrieren
    window.addEventListener("createform-updated", handleUpdate);

    // Initial laden
    handleUpdate();

    return () => {
      window.removeEventListener("createform-updated", handleUpdate);
    };
  }, []);

  return (
    <div className="h-24">
      <div className="z-10">
        <ImageWithText previewData={previewData} options={data} />
      </div>
    </div>
  );
}
