import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 absolute">
      <div
        className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-[#092C39] border-r-[#092C39] border-b-[#224957] border-l-[#224957]"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
