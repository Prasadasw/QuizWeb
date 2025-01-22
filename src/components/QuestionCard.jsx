import React from 'react'

const QuestionCard = ({ question, onAnswer }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{question.question}</h3>
        <div className="mt-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="block w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuestionCard;
  
