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
