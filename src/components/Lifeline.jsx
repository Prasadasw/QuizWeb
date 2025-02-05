import React from "react";
import "./Lifeline.css"; // Import the CSS file

const Lifeline = () => {
  return (
    <div className="lifeline-container">
      <div className="lifeline-header">LIFELINES</div>
      <div className="lifeline-buttons">
        <button className="lifeline-button">ASK A FRIEND</button>
        <button className="lifeline-button">50-50</button>
      </div>
      <div className="lifeline-buttons">
        <button className="lifeline-button">DOUBLE CHANCE</button>
        <button className="lifeline-button">AUDIENCE POLL</button>
      </div>
    </div>
  );
};

export default Lifeline;
