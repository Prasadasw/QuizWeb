import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import CelebrationModal from "./CelebrationModal";
import questions from "../data/questions.json"; // Adjust the path as needed

const QuizScreen = ({ playerName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(null);

  const handleAnswer = (selectedOption) => {
    const correct = questions[currentQuestion].answer === selectedOption;
    setModal(correct ? "success" : "failure");

    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      setModal(null);
      setCurrentQuestion((prev) => prev + 1);
    }, 2000);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1 className="text-3xl">
          Congratulations {playerName}! You scored {score}/{questions.length}.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl">Level {Math.floor(currentQuestion / 5) + 1}</h2>
      <QuestionCard
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
      {modal && <CelebrationModal type={modal} />}
    </div>
  );
};

export default QuizScreen;
