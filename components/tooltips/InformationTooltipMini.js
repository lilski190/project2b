import React from "react";

/**
 * Tooltip-Komponente, die einen Hinweistext anzeigt, wenn man über das Kind-Element hovert.
 *
 * Nutzt DaisyUI-Klassen für das Styling.
 *
 * @param {Object} props
 * @param {string} props.text - Der Text, der im Tooltip angezeigt wird
 * @param {React.ReactNode} props.children - Das Element, auf das der Tooltip angewendet wird
 *
 * @returns {JSX.Element} Tooltip-Wrapper mit Text und Kind-Element
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
