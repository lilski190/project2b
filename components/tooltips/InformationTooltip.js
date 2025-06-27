import React from "react";

/**
 * Tooltip Komponent von DaisyUI
a
 */
const InformationTooltip = ({ text }) => {
  return (
    <div className="tooltip tooltip-left">
      <div className="tooltip-content">
        <div className="">{text}</div>
      </div>
      <div className="btn btn-soft btn-info btn-circle h-7 w-7">?</div>
    </div>
  );
};

export default InformationTooltip;
