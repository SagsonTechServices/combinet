import React from "react";
import SVG from "./SVG";

function Alert({ alertType, text }) {
  return (
    <div role="alert" className={`alert alert-${alertType}`}>
      <SVG type={alertType}></SVG>
      <span>Warning: {text}</span>
    </div>
  );
}

export default Alert;
