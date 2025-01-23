import React, { useState } from "react";
import questions from "../data/questions.json"; // Adjust the path as needed
import bgscreen from "../assets/images/frame6.png";
import boy from "../assets/images/boyquize.png";

const QuizScreen = ({ playerName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = questions[currentQuestion].answer === option;

    setTimeout(() => {
      setSelectedOption(null);
      if (correct) setScore((prev) => prev + 1);
      setCurrentQuestion((prev) => prev + 1);
    }, 1000);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-center">
          Congratulations {playerName}! You scored {score}/{questions.length}.
        </h1>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgscreen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <h1
        className="text-6xl font-extrabold mb-8"
        style={{
          color: "#382873",
          fontFamily: "Quicksand, sans-serif",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          WebkitTextStroke: "1px #6A3AC6",
          backgroundImage: "linear-gradient(145deg, #ffffff, #C0A7EE)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.25))",
        }}
      >
        Quiz Time
      </h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start w-full max-w-5xl">
        {/* Left Section: Question */}
        <div className="w-full lg:w-1/2 flex items-start mt-14">
          <div className="flex items-center gap-10">
            {/* Question Number */}
            <div
              className="w-20 h-14 flex items-center justify-center bg-[#FFD464] text-black font-bold text-xl rounded-md"
              style={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.75)",
              }}
            >
              {currentQuestion + 1}
            </div>

            {/* Question Text */}
            <p className="text-4xl shadow-black font-bold text-black">
              {current.question}
            </p>
          </div>
        </div>

        {/* Right Section: Boy Image and Options */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {/* Boy Image */}
          <img
            src={boy}
            alt="Quiz Boy"
            style={{ height: "200px", width: "200px", objectFit: "contain",marginLeft:'16.5rem' }}
          />

          {/* Answer Options */}
          <div className="w-full flex flex-col items-center">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-3/4 text-left px-4 py-3 mb-2 text-lg rounded-md border border-[#C096FD] shadow-inner font-bold text-[#004D70] transition-all flex items-center gap-3 ${
                  selectedOption === option ? "bg-[#704FE6] text-white" : "bg-[#DEC8FE]"
                }`}
              >
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#004D70] font-bold"
                >
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
