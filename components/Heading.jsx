import React from "react";

const Heading = ({ heading = "", customClasses = "", headingClasses = "" }) => {
  return (
    <div className={`flex justify-center ${customClasses}`}>
      <h1 className={`font-bold text-4xl text-center ${headingClasses}`}>
        {heading}
      </h1>
    </div>
  );
};

export default Heading;
