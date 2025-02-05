import React from "react";

const ScoreScreen = ({ playerName, score, totalQuestions, onRestart }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Congratulations {playerName}!
      </h1>
      <p className="text-2xl mb-8">
        You scored {score} out of {totalQuestions}
      </p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-md"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreScreen;
