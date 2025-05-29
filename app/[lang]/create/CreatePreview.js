"use client";

import { Toaster } from "react-hot-toast";
import { saveStyleguideAction } from "@/app/actions/styleguideAction";
import InformationTooltip from "@/components/tooltips/InformationTooltip";

/**
 * Styleguide FORM Komponent
 */
export default function CreateForm({ dict, data }) {
  // let parsedData = JSON.parse(data);
  // console.log("data", parsedData);
  return (
    <div className="bg-primary/30">
      {" "}
      THIS IS THE PREVIEW OF THE CONTENT:
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
