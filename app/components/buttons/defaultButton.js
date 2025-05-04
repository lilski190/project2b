import React from "react";

const DefaultButton = ({ text, colorClass }) => {
  return (
    <button className={`btn ${colorClass ? colorClass : "btn-neutral"}`}>
      {text ? text : "Default text"}
    </button>
  );
};

export default DefaultButton;
