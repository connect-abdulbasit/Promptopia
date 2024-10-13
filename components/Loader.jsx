import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className} `}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );
};

export default Loader;
