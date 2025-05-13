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
      <button className="btn">?</button>
    </div>
  );
};

export default InformationTooltip;
