import React from "react";

const Heading = ({ heading = "", customClasses = "" }) => {
  return (
    <div className={`flex justify-center ${customClasses}`}>
      <h1 className="font-bold text-4xl text-center">{heading}</h1>
    </div>
  );
};

export default Heading;
