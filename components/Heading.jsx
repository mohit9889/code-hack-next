import React from 'react';

/**
 * Heading Component
 *
 * A reusable heading component that centers the text and allows custom styling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.heading=''] - The text content for the heading
 * @param {string} [props.customClasses=''] - Additional classes for the container div
 * @param {string} [props.headingClasses=''] - Additional classes for the `<h1>` element
 * @returns {JSX.Element} The Heading component.
 */
const Heading = ({ heading = '', customClasses = '', headingClasses = '' }) => {
  return (
    <div className={`flex justify-center ${customClasses}`}>
      <h1 className={`text-center text-4xl font-bold ${headingClasses}`}>
        {heading}
      </h1>
    </div>
  );
};

export default Heading;
