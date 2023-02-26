import React from "react";

/**
 * Component for showing a Loading element on top of the screen when data is being loaded from the database
 */
const LoadingScreen = () => {
  return (
    <div className="triangles">
      <div className="first"></div>
      <div className="second"></div>
      <div className="third"></div>
    </div>
  );
};

export default LoadingScreen;
