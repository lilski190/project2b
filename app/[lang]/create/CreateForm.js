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
    <form>
      <Toaster position="top-center" />
      <div className="grid grid-cols-2 max-md:grid-cols-1 ">
        <div className="col-span-1 bg-base-200">
          <p className="headline">{dict.styleguide.title}</p>
          <p className="baseText">{dict.styleguide.description}</p>

          <div className="flex justify-between w-full">
            <div className="lableText">{dict.styleguide.headlines.colors}</div>
            <InformationTooltip text={dict.styleguide.infotext.colors} />
          </div>
        </div>
      </div>
    </form>
  );
}
