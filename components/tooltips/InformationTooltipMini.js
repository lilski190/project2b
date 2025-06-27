import React from "react";

/**
 * Tooltip Komponent von DaisyUI
a
 */
const InformationTooltipMini = ({ text }) => {
  return (
    <div className="tooltip tooltip-top">
      <div className="tooltip-content">
        <div className="">{text}</div>
      </div>
      <div className=" lableTextSmall bg-info/20 rounded-full w-4 text-center">
        ?
      </div>
    </div>
  );
};

export default InformationTooltipMini;
