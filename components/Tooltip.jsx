import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {showTooltip && (
        <div className="absolute z-10 p-2 rounded shadow-md bottom-full left-1/2 transform -translate-x-1/2 bg-black-primary bg-opacity-60 text-white whitespace-nowrap text-sm">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
