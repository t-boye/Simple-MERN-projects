import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  // Set appropriate size (optional):
  const size = 80; // Adjust as needed

  return (
    <div className="text-blue-500">
      <BeatLoader size={size} color={"#3498db"} />{" "}
      {/* Customize color (optional) */}
      <p>Loading</p>
    </div>
  );
};

export default LoadingSpinner;
