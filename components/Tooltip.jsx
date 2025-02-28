import React, { useState } from 'react';

/**
 * Tooltip Component
 *
 * Displays a tooltip when hovering over its child element.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.text - The tooltip text to display
 * @param {React.ReactNode} props.children - The element that triggers the tooltip
 * @returns {JSX.Element} - The tooltip UI
 */
const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)} // Accessibility: Show tooltip on focus
      onBlur={() => setShowTooltip(false)} // Accessibility: Hide tooltip on blur
    >
      {children}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black-primary/60 p-2 text-sm text-white shadow-md"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
