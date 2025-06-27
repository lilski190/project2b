import React from "react";

/**
 * Tooltip Komponent von DaisyUI
a
 */
const InformationTooltipRight = ({ text }) => {
  return (
    <div className="tooltip tooltip-right">
      <div className="tooltip-content">
        <div className="">{text}</div>
      </div>
      <div className="btn btn-soft btn-info btn-circle h-5 w-5 mb-0.5">?</div>
    </div>
  );
};

export default InformationTooltipRight;
